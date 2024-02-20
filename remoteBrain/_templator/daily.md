---
wakeup🌞: 
sleep🌜: 
mood: 
workout🏋️: 
workout-type: 
workout-routine: 
gratitude🙏: 
breakfast🍳: 
lunch🍚: 
dinner🥗: 
snack🍬: 
tags:
  - meal-log📝
  - study-log📓
  - workout-log💪
  - "#routine"
---

<%*
	/* Parsing Date */ 
	currentDate  = moment(tp.file.title, 'YYYY-MM-DD dd')
	previousDate = moment(tp.file.title, 'YYYY-MM-DD dd').add(-1, "days")
	nextDate     = moment(tp.file.title, 'YYYY-MM-DD dd').add(+1, "days")

	/* Previous date parsing */
	previousDate_year  = previousDate.format("YYYY")
	previousDate_month = previousDate.format("MM")
	previousDate_ymd   = previousDate.format("YYYY-MM-DD")
	previousDate_wday  = previousDate.format("dd") 

	/* Past date parsing */ 
	nextDate_year  = nextDate.format("YYYY")
	nextDate_month = nextDate.format("MM") 
	nextDate_ymd   = nextDate.format("YYYY-MM-DD")
	nextDate_wday  = nextDate.format("dd")
	
-%>🔺 [[01_PLANER/<% previousDate_year %>/<% previousDate_month %>/<% previousDate_ymd %> <% previousDate_wday %> | <% previousDate_ymd %> <% previousDate_wday %>]]
🔻 [[01_PLANER/<% nextDate_year %>/<% nextDate_month %>/<% nextDate_ymd %> <% nextDate_wday %> | <% nextDate_ymd %> <% nextDate_wday %>]]
___
<h1> <center>⏰TimeTable </center> </h1>

```gEvent
type: week
date: <% tp.file.title %>
navigation: false
showAllDay: false
hourRange: [6, 22]
offset: -3
include: ["Schedule", "Todoist", "Korea"]
timespan: 7
```

--- 


# Routine 
- [ ] 유산균 1알 먹기 🔼 
- [ ] 운동하기 🔼
- [ ] 아침, 점심, 간식, 저녁 건강하게 4끼 챙겨먹기
- [ ] 무지출 챌린지 
- [ ] 집 정리·정돈하기 🔼
- [ ] 개발 공부하기
- [ ] 바깥 음식 안 먹기 

--- start-multi-column: Main-Part  
```column-settings  
number of columns: 3  
Column Size: Large
Border: off
Shadow: on
Column Spacing: 10px

Overflow: [Scroll, Scroll, Scroll]
```

# To-do List

--- end-column ---

# Overdue List
```tasks
not done
tags include #todoist 
path does not include {{query.file.path}}
hide backlink
priority is high
```
--- end-column ---

# Related Pages

--- end-column ---


### Thoughts & Inspirations
