---
wakeup🌞:
sleep🌜:
mood:
workout🏋️:
workout-type:
workout-routine:
gratitude🙏:
keyword🗝️:
tags:
  - meal-log📝
  - study-log📓
  - workout-log💪
  - routine
---

<%*
	/* Parsing Date */ 
	currentDate  = moment(tp.file.title, 'YYYY-MM-DD dd')
	previousDate = moment(tp.file.title, 'YYYY-MM-DD dd').add(-1, "days")
	nextDate     = moment(tp.file.title, 'YYYY-MM-DD dd').add(+1, "days")

	/* Previous date parsing */
	previousDate_year  = previousDate.format("YYYY")
	previousDate_month = previousDate.format("MM_MMMM")
	previousDate_ymd   = previousDate.format("YYYY-MM-DD")
	previousDate_wday  = previousDate.format("ddd") 

	/* Past date parsing */ 
	nextDate_year  = nextDate.format("YYYY")
	nextDate_month = nextDate.format("MM_MMMM") 
	nextDate_ymd   = nextDate.format("YYYY-MM-DD")
	nextDate_wday  = nextDate.format("ddd")
	
-%>🔺 [[remoteBrain/Daily-docs/<% previousDate_year %>/<% previousDate_month%>/<% previousDate_ymd %> <% previousDate_wday %> | <% previousDate_ymd %> <% previousDate_wday %>]]
🔻 [[remoteBrain/Daily-docs/<% nextDate_year %>/<% nextDate_month %>/<% nextDate_ymd %> <% nextDate_wday %> | <% nextDate_ymd %> <% nextDate_wday %>]]
___
<h1> <center>⏰TimeTable </center> </h1>

```gEvent
type: week
date: <% tp.file.title %>
navigation: false
showAllDay: true
hourRange: [8, 24]
offset: -2
include: ["Default", "Todoist", "Korea", "Work", "Study", "Game"]
timespan: 7
```

--- 
# Today's GOAL (Top 3)

- [ ] 
- [ ] 
- [ ] 

# Today’s Tasks


# Delayed Tasks
```tasks
not done
(tags include #work💼) OR (tags include #chores🧺) OR (tags include #todo)
path does not include <%tp.file.title%>
hide backlink
```

# Notes



# Routines

<%*
const weekday = tp.date.now("dddd");
const dayOfMonth = tp.date.now("D");
let checklist = [];

// ──────────────────
// Daily 루틴
// ──────────────────

// 1. 독서
// 2. 다이어리 쓰기
// 3. 정리정돈
// 4. 식사 기록
// 5. 식후 산책
// 6. 대학원 생활
checklist.push("- [ ] 5분 독서하기.");
checklist.push("- [ ] 10분 다이어리 쓰기 (한 줄도 OK).");
checklist.push("- [ ] 10분 정리정돈 하기.");
checklist.push("- [ ] 10분 식사 제시간에 챙겨 먹고 기록하기.");
checklist.push("- [ ] 5분 식후 산책하기.");
checklist.push("- [ ] 30분 대학원 수업/논문/레포트 마감 밀리지 않기.");

// ──────────────────
// Weekly 루틴
// ──────────────────

// 7. 운동 — 주 3회 (화/목/토 기준)
if (["Tuesday", "Thursday", "Saturday"].includes(weekday)) {
  checklist.push("- [ ] 50분 운동하기 (주 3회 목표).");
}

// 8. 일본어 공부 — 주 1회 (목요일 리마인드)
if (weekday === "Wednesday") {
  checklist.push("- [ ] 10분 일본어 공부하기 (주 1회 목표).");
}

// ──────────────────
// Monthly 루틴
// ──────────────────

// 9. 블로그 업로드 — 월 1회 (매달 15일 리마인드)
if (dayOfMonth === "15") {
  checklist.push("- [ ] 50분 블로그 월 1회 업로드하기.");
}

// 10. 저축 — 월 1회 (매달 10일: 월급일) 
if (dayOfMonth === "10") {
  checklist.push("- [ ] 월 저축 60만원 이상 하기.");
}

tR += checklist.join("\n");
%>
