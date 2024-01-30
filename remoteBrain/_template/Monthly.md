
## Meal Logs
```dataview
TABLE 
	breakfast🍳, lunch🍚, dinner🥗, snack🍬
FROM 
	#meal-log📝 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/{{date:YYYY}}/{{date:MMMM}}"
```


## Workout Logs
```dataview
TABLE 
	workout🏋️, workout-type as type, workout-routine as routine 
FROM 
	#workout-log💪 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/{{date:YYYY}}/{{date:MMMM}}"
```

searchType: text ← 본문 내용 중에서 체크할 것을 찾는다.  
searchTarget: 'Total\s+(?[0-9]+)\s+Pomo' ← 정규식  
folder: 7. JOURNAL ← 찾을 폴더를 지정한다  
startDate: -1M ← 표시할 기간을 정할 수 있다(최근 한 달)  
bar: ← 표시 형태는 막대 그래프  
title: 뽐모도르 ← 그래프 이름  
yAxisLabel: Times ← Y축 설명  
yAxisUnit: Pomo ← Y축 설명