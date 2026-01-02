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

previousDate_year  = previousDate.format("YYYY")
previousDate_month = previousDate.format("MM_MMMM")
previousDate_ymd   = previousDate.format("YYYY-MM-DD")
previousDate_wday  = previousDate.format("ddd") 

nextDate_year  = nextDate.format("YYYY")
nextDate_month = nextDate.format("MM_MMMM") 
nextDate_ymd   = nextDate.format("YYYY-MM-DD")
nextDate_wday  = nextDate.format("ddd")
-%>

🔺 [[remoteBrain/Daily-docs/<% previousDate_year %>/<% previousDate_month %>/<% previousDate_ymd %> <% previousDate_wday %> | <% previousDate_ymd %> <% previousDate_wday %>]]
🔻 [[remoteBrain/Daily-docs/<% nextDate_year %>/<% nextDate_month %>/<% nextDate_ymd %> <% nextDate_wday %> | <% nextDate_ymd %> <% nextDate_wday %>]]

___

<h1><center>⏰ TimeTable</center></h1>

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


# Routines

## Today's

- [ ] 🌱 오늘은 회복 모드로 진행하기
```dataviewjs
const page = dv.current();
const weekday = moment(page.file.name, "YYYY-MM-DD").format("dddd");

// 회복 모드 체크 여부 (본문 체크박스 기반)
const recoveryMode =
  page.file.tasks
    .where(t => t.text.includes("회복 모드"))
    .where(t => t.completed)
    .length > 0;

// ──────────────────
// 출력
// ──────────────────

// Daily 루틴 (항상 표시)
dv.paragraph(`
- [ ] 📘 독서 5분  
- [ ] 📝 다이어리 쓰기 20분
- [ ] 🧹 정리정돈 10분  
- [ ] 🍽️ 식사 기록 5분
- [ ] 🚶 식후 산책 5분
`);

if (recoveryMode) {
  dv.paragraph("🌱 **회복 모드 ON — 최소 루틴만 진행합니다**");
} else {
  let weekly = [];
  
  if (weekday === "Monday")
	weekly.push("- [ ] 🎓 대학원 수업 / 논문 관리");

  if (["Tuesday", "Thursday", "Saturday"].includes(weekday))
    weekly.push("- [ ] 🏋️ 운동 50분");

  if (["Wednesday", "Sunday"].includes(weekday))
    weekly.push("- [ ] 🎨 그림 공부 70분");

  if (weekday === "Thursday")
    weekly.push("- [ ] 🇯🇵 일본어 공부 10분");

  if (weekday === "Sunday")
    weekly.push("- [ ] ✍️ 블로그 글 작성");

  if (weekly.length > 0) {
	dv.header(2, "Weekly");
    dv.paragraph(weekly.join("\n"));
  }
}

```


# Notes