
## Keywords
```dataview
TABLE 
	keyword🗝️, gratitude🙏, mood
FROM 
	#routine 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2024/12_December"
sort file.name	
```



## Sleep Tracker
```dataview
TABLE
	dateformat(wakeup🌞, "HH:mm") AS "wakeup🌞", 
	dateformat(sleep🌜, "HH:mm") AS "sleep🌜", 
	durationformat((wakeup🌞 - sleep🌜), "h'hr' m'min'") AS "time",
	("■" * number(durationformat((wakeup🌞 - sleep🌜), "h"))) 
	+ "□" * (10 - number(durationformat((wakeup🌞 - sleep🌜), "h"))) AS " ", mood
FROM 
	 #routine 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2024/12_December"
sort file.name
```



## Meal Logs
```dataview
TABLE 
	breakfast🍳, lunch🍚, dinner🥗, snack🍬, water💧, (bfcals + lccals + dncals + sncals) AS "calrories🪄"
FROM 
	#meal-log📝 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2024/12_December"
sort file.name	
```


## Workout Logs
```dataview
TABLE 
	workout🏋️, workout-type as type, workout-routine as routine 
FROM 
	#workout-log💪 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2024/12_December"
sort file.name
```


## Habit Tracker 
```dataview
TABLE WITHOUT ID
	link(file.name) as "Day",
	choice(file.tasks[0].completed, "✔️", "✗") AS "영양제 챙겨먹기",
	choice(file.tasks[1].completed, "✔️", "✗") AS "운동하기",
	choice(file.tasks[2].completed, "✔️", "✗") AS "도시락 챙기기",
	choice(file.tasks[3].completed, "✔️", "✗") AS "무지출 챌린지",
	choice(file.tasks[4].completed, "✔️", "✗") AS "집안일 잘하기",
	choice(file.tasks[5].completed, "✔️", "✗") AS "개발 공부 하기",
	choice(file.tasks[6].completed, "✔️", "✗") AS "외식 안하기"
	FROM #routine 
	WHERE
	file.folder = "remoteBrain/Daily-Docs/2024/12_December"
	SORT file.name ASC
```
