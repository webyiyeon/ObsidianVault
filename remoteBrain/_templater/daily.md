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

---

## 📆 Weekly
- [ ] 🎓 월요일: 대학원 수업 / 논문 관리 30분
- [ ] 🏋️ 화·목·토: 운동 50분
- [ ] 🎨 수·일: 그림 공부 70분
- [ ] 🇯🇵 목요일: 일본어 공부 10분
- [ ] ✍️ 일요일: 블로그 글 작성 40분

# Notes