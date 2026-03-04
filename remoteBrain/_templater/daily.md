---
wakeup🌞:
sleep🌜:
mood:
workout🏋️:
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


# Routines

## Daily
- [ ] 📘 독서 5분
- [ ] 📝 다이어리 쓰기 20분
- [ ] 🧹 정리정돈 10분
- [ ] 🍽️ 식사 기록 5분
- [ ] 🚶 식후 산책 5분

<%*
// 1. 오늘 요일 계산
const dayMap = { 
  1: "Monday", 
  2: "Tuesday", 
  3: "Wednesday", 
  4: "Thursday", 
  5: "Friday", 
  6: "Saturday", 
  0: "Sunday" 
};
const fileDate = moment(tp.file.title, "YYYY-MM-DD dd");
const today = dayMap[fileDate.day()];

// 2. 전체 할 일 데이터 (중복 제거 전)
const allTasks = [
  "🏃 운동 50분",
  "🎓 대학원 수업 / 논문 관리 30분",
  "👩‍💻 블로그 글 작성 40분",
  "🎨 그림 공부 50분",
  "📓 일본어 공부 10분",
  "🧹 청소기 돌리기",
  "🎨 그림 공부 70분" // 일요일에만 70분이라 따로 들어갔지만, 중복 제거시 하나로 합칠 수 있습니다.
];

// 3. 중복 제거 (Set 활용)
const uniqueTasks = [...new Set(allTasks)];

// 4. 출력
tR += `## Today is ${today}\n\n`;
uniqueTasks.forEach(task => {
  tR += `- [ ] ${task}\n`;
});
%>

# To-do List


# Overdue List
```tasks
not done
(tags include #work💼) OR (tags include #chores🧺) OR (tags include #todo)
path does not include <%tp.file.title%>
hide backlink
```


# Notes