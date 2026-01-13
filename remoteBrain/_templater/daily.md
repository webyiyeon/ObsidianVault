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
const dayMap = {
  1: "月",
  2: "火",
  3: "水",
  4: "木",
  5: "金",
  6: "土",
  0: "日",
};

const tasks = {
  "月": "- [ ] 🎓 대학원 수업 / 논문 관리 30분",
  "火": "- [ ] 🏃 운동 50분",
  "水": "- [ ] 🎨 그림 공부 70분",
  "木": "- [ ] 🏃 운동 50분\n- [ ] 📓 일본어 공부 10분",
  "土": "- [ ] 🏃 운동 50분\n- [ ] 🧹 청소기 돌리기",
  "日": "- [ ] 🎨 그림 공부 70분\n- [ ] 👩‍💻 블로그 글 작성 40분",
};

// 파일 제목 기준 날짜 파싱
const fileDate = moment(tp.file.title, "YYYY-MM-DD dd");

// 요일 계산
const today = dayMap[fileDate.day()];

tR += `## Weekly (${today})\n${tasks[today]}\n`;
%>




# Notes