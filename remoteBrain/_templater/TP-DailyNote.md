---
banner: "![[sydney-city.jpg]]"
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
	
-%>🔺 [[01_PLANER/<% previousDate_year %>年/<% previousDate_month %>월/<% previousDate_ymd %> <% previousDate_wday %> | <% previousDate_ymd %> <% previousDate_wday %>]]
🔻 [[01_PLANER/<% nextDate_year %>年/<% nextDate_month %>월/<% nextDate_ymd %> <% nextDate_wday %> | <% nextDate_ymd %> <% nextDate_wday %>]]
___
<h1> <center>⏰TimeTable </center> </h1>

```gEvent
type: week
date: <% tp.file.title %>
navigation: false
showAllDay: false
hourRange: [6, 22]
offset: -3
include: ["[PERSONAL] Schedule", "[PERSONAL] Work", "[PERSONAL] Study", "[INTERX] Schedule", "[INTERX] Work"]
timespan: 8
```

--- start-multi-column: Main-Part  
```column-settings  
number of columns: 3  
Column Size: Large
Border: off
Shadow: on
Column Spacing: 10px

Overflow: [Scroll, Scroll, Scroll]
```
# ☑️ TodoLists

- 
- 

--- end-column ---

# ✅ CheckLists

- [ ] 
- [ ] 

--- end-column ---

# 📙 RelatedPages


--- end-column ---


--- end-multi-column

# 📒 Note

# 🏁 Summary
- 일간 별 정리 사항 
- 환경별 
	- 
- 개인별 
	- 날씨, 컨디션, 스트레스 
	- 종합 점수 
- 업무별 
