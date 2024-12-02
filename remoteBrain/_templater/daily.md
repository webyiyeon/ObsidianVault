---
wakeup🌞: 
sleep🌜: 
mood: 
workout🏋️: 
workout-type: 
workout-routine: 
gratitude🙏: 
keyword🗝️: 
breakfast🍳: 
bfcals: 0
lunch🍚: 
lccals: 0
dinner🥗: 
dncals: 0
snack🍬: 
sncals: 0
water💧: 
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
include: ["Default", "Todoist", "Korea", "Work", "Study", "WOOYEON"]
timespan: 7
```

--- 


# Routine 

- [ ] 영양제 챙겨 먹기 🔼 
- [ ] 운동하기 🔼 
- [ ] 도시락 싸먹기 
- [ ] 무지출 챌린지 
- [ ] 집 정리·정돈하기 🔼
- [ ] 개발 공부하기
- [ ] 바깥 음식 안 먹기 
- [ ] 영어 공부하기 🔼 


# To-do List


# Overdue List
```tasks
not done
(tags include #work💼) OR (tags include #chores🧺) OR (tags include #todo)
path does not include <%tp.file.title%>
hide backlink
```

# Related Pages



# Thoughts & Inspirations

