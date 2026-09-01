/*
 * Fetches events for a given date directly from the Google Calendar
 * "secret ical address" URLs, bypassing the ICS community plugin
 * entirely (it was silently dropping some events depending on their
 * busy/free status). No dependency on that plugin's settings.
 *
 * Usage from a template:
 *   <%* tR += await tp.user.importCalendars(tp, tp.file.title.slice(0,10)) %>
 */

const CALENDARS = [
	{ tag: "#schedule", url: "https://calendar.google.com/calendar/ical/yiyeon79%40gmail.com/private-448cff6a563701b14c82db84e1128058/basic.ics" },
	{ tag: "#todo", url: "https://calendar.google.com/calendar/ical/ca01425c7a7dbb5a08c84ae9aa5deba2e7d84abe2ef565184dd45cd21b224c27%40group.calendar.google.com/private-aecce73937e227a1f649f356100bbcb6/basic.ics" },
	{ tag: "#study📓", url: "https://calendar.google.com/calendar/ical/adf54ca5317dc5fd6f4ffae6a8ba7ad1d9f1f8824c7fd00c134abbf85b34e619%40group.calendar.google.com/private-e238e63d655d5433323461b947f0434d/basic.ics" },
	{ tag: "#concert", url: "https://calendar.google.com/calendar/ical/9897cf4c3c671637ad3bb47189bef86af52c3250fde9281667165b70076a295f%40group.calendar.google.com/private-3144e2ce49247a316ec9590cb2bcd17c/basic.ics" },
	{ tag: "#game", url: "https://calendar.google.com/calendar/ical/54e0ade765b819ec16144e3a378f5e49f55bdfdc4536e342c6f5dd1b0ac938c7%40group.calendar.google.com/private-e4a306adabb819da0f0e6be85a8013d3/basic.ics" },
	{ tag: "#work💼", url: "https://calendar.google.com/calendar/ical/d98979f0179c75a3e3390f7e908281782a64a49ec59783ef4658fc5f3deefbcc%40group.calendar.google.com/private-a27e4e118585c4c5c5b777017017c1ea/basic.ics" },
];

function unfoldICS(text) {
	// ICS "folds" long lines with a leading space/tab on the continuation line
	return text.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
}

function parseICSDate(value) {
	const isDateOnly = /^\d{8}$/.test(value);
	if (isDateOnly) {
		return { allDay: true, moment: window.moment(value, "YYYYMMDD") };
	}
	const isUTC = value.endsWith("Z");
	const clean = value.replace("Z", "");
	const m = isUTC
		? window.moment.utc(clean, "YYYYMMDDTHHmmss").local()
		: window.moment(clean, "YYYYMMDDTHHmmss"); // floating/local time, authored in Asia/Seoul
	return { allDay: false, moment: m };
}

function unescapeText(s) {
	return s.replace(/\\n/g, " ").replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\\\/g, "\\");
}

function parseVEvents(icsText) {
	const events = [];
	const blocks = icsText.split("BEGIN:VEVENT").slice(1);
	for (const raw of blocks) {
		const block = raw.split("END:VEVENT")[0];
		const lines = block.split(/\r?\n/).filter((l) => l.trim().length > 0);
		let dtstart = null, dtend = null, summary = "", rrule = null;
		const exdates = [];
		for (const line of lines) {
			const idx = line.indexOf(":");
			if (idx === -1) continue;
			const keyPart = line.slice(0, idx);
			const val = line.slice(idx + 1);
			const key = keyPart.split(";")[0];
			if (key === "DTSTART") dtstart = parseICSDate(val);
			else if (key === "DTEND") dtend = parseICSDate(val);
			else if (key === "SUMMARY") summary = unescapeText(val);
			else if (key === "RRULE") rrule = val;
			else if (key === "EXDATE") exdates.push(val.split(",")[0].replace("Z", ""));
		}
		if (!dtstart) continue;
		events.push({ dtstart, dtend, summary, rrule, exdates });
	}
	return events;
}

// Minimal RRULE support: FREQ=DAILY/WEEKLY/MONTHLY/YEARLY, INTERVAL, UNTIL, BYDAY (weekly only)
function ruleMatchesDate(rrule, dtstartMoment, target) {
	const parts = {};
	rrule.split(";").forEach((p) => {
		const [k, v] = p.split("=");
		parts[k] = v;
	});
	const freq = parts.FREQ;
	const interval = parseInt(parts.INTERVAL || "1", 10);
	if (target.isBefore(dtstartMoment, "day")) return false;
	if (parts.UNTIL) {
		const until = parseICSDate(parts.UNTIL.replace("Z", "")).moment;
		if (target.isAfter(until, "day")) return false;
	}
	if (freq === "DAILY") {
		const diff = target.diff(dtstartMoment, "days");
		return diff >= 0 && diff % interval === 0;
	}
	if (freq === "WEEKLY") {
		if (parts.BYDAY) {
			const dayMap = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
			const byDays = parts.BYDAY.split(",").map((d) => dayMap[d]);
			if (!byDays.includes(target.day())) return false;
			const weekDiff = target.clone().startOf("week").diff(dtstartMoment.clone().startOf("week"), "weeks");
			return weekDiff >= 0 && weekDiff % interval === 0;
		}
		const diff = target.diff(dtstartMoment, "days");
		return diff >= 0 && diff % (7 * interval) === 0;
	}
	if (freq === "MONTHLY") {
		return target.date() === dtstartMoment.date() &&
			(target.year() - dtstartMoment.year()) * 12 + (target.month() - dtstartMoment.month()) >= 0 &&
			((target.year() - dtstartMoment.year()) * 12 + (target.month() - dtstartMoment.month())) % interval === 0;
	}
	if (freq === "YEARLY") {
		return target.date() === dtstartMoment.date() && target.month() === dtstartMoment.month();
	}
	return false;
}

async function importCalendars(tp, dateStr) {
	const { requestUrl } = tp.obsidian;
	const targetDate = window.moment(dateStr, "YYYY-MM-DD");
	const targetYMD = targetDate.format("YYYYMMDD");

	const lines = [];
	for (const cal of CALENDARS) {
		try {
			const res = await requestUrl({ url: cal.url });
			const text = unfoldICS(res.text);
			const events = parseVEvents(text);
			const dayEvents = [];
			for (const ev of events) {
				let matches;
				if (ev.rrule) {
					const excluded = ev.exdates.some((ex) => ex.startsWith(targetYMD));
					matches = !excluded && ruleMatchesDate(ev.rrule, ev.dtstart.moment, targetDate);
				} else {
					matches = ev.dtstart.moment.format("YYYYMMDD") === targetYMD;
				}
				if (!matches) continue;

				let timeStr = "00:00";
				let endStr = "";
				if (!ev.dtstart.allDay) {
					timeStr = ev.dtstart.moment.format("HH:mm");
					if (ev.dtend && !ev.dtend.allDay) endStr = ` - ${ev.dtend.moment.format("HH:mm")}`;
				}
				dayEvents.push({ timeStr, line: `- [ ] ${timeStr}${endStr} ${cal.tag} ${ev.summary}` });
			}
			dayEvents.sort((a, b) => a.timeStr.localeCompare(b.timeStr));
			lines.push(...dayEvents.map((e) => e.line));
		} catch (e) {
			lines.push(`- [ ] ⚠️ ${cal.tag} 캘린더를 불러오지 못했어요: ${e.message}`);
		}
	}

	return lines.length ? lines.join("\n") : "- [ ] (해당 날짜 일정 없음)";
}

module.exports = importCalendars;
