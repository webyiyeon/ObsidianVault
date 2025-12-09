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
let checklist = [];

// 1. 운동하기 — 매일
checklist.push("- [ ] 건강한 몸에 건강한 마음이 깃든다. 운동하기.");

// 2. 산책 — 점심/저녁 식후 매일
checklist.push("- [ ] 점심 & 저녁 식후 3~5분이라도 산책하기.");

// 3. 정리정돈 — 매일
checklist.push("- [ ] 하루 최소 10분 정리정돈 하기.");

// 4. 제시간 식사 — 매일
checklist.push("- [ ] 식사 시간 지키고 기록하기.");

// 5. 일본어 공부 — 주 1회 (목요일 기준 리마인드)
if (weekday === "Thursday") {
  checklist.push("- [ ] 일본어 공부하기 (주 1회 목표)");
}

// 6. 블로그 업로드 — 주 1회 (일요일 리마인드)
if (weekday === "Sunday") {
  checklist.push("- [ ] 블로그 1회 업로드하기.");
}

// 7. 독서 — 주 1회 (화요일 리마인드)
if (weekday === "Tuesday") {
  checklist.push("- [ ] 독서하기 (주 1회 목표).");
}

// 8. 대학원 과제 — 매일 가능 (학기 중)
checklist.push("- [ ] 대학원 수업/레포트 밀리지 않기.");

// 9. 저축 — 월 1회(매달 1일 리마인드)
if (tp.date.now("D") === "1") {
  checklist.push("- [ ] 이번 달 저축 60만원 이상 하기.");
}

// 10. 여행 준비는 하반기(6~12월만)
let monthNum = Number(tp.date.now("MM"));
if (monthNum >= 6) {
  checklist.push("- [ ] 해외 여행 준비 / 리서치하기.");
}

tR += checklist.join("\n");
%>