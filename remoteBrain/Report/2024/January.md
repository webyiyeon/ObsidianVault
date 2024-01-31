## Sleep Tracker
```dataview
TABLE
	dateformat(wakeup🌞, "HH:mm") AS "wakeup🌞", 
	dateformat(sleep🌜, "HH:mm") AS "sleep🌜", 
	durationformat((wakeup🌞 - sleep🌜), "h'hr' m'min'") AS "time",
	("▨" * number(durationformat((wakeup🌞 - sleep🌜), "h"))) 
	+ "▢" * (10 - number(durationformat((wakeup🌞 - sleep🌜), "h"))) AS " ", mood
FROM 
	 #routine 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2024/January"
```


## Meal Logs
```dataview
TABLE 
	breakfast🍳, lunch🍚, dinner🥗, snack🍬
FROM 
	#meal-log📝 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2024/January"
```


## Workout Logs
```dataview
TABLE 
	workout🏋️, workout-type as type, workout-routine as routine 
FROM 
	#workout-log💪 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2024/January"
```

## Habit Tracker 
```dataview
TABLE WITHOUT ID
	link(file.name) as "Day",
	choice(file.tasks[0].completed, "✔️", "❌") AS "유산균 먹기",
	choice(file.tasks[1].completed, "✔️", "❌") AS "운동하기",
	choice(file.tasks[2].completed, "✔️", "❌") AS "건강 끼니 챙기기",
	choice(file.tasks[3].completed, "✔️", "❌") AS "무지출 챌린지",
	choice(file.tasks[4].completed, "✔️", "❌") AS "집 정리・정돈하기",
	choice(file.tasks[5].completed, "✔️", "❌") AS "개발 공부 하기",
	choice(file.tasks[6].completed, "✔️", "❌") AS "바깥음식 안 먹기"
	FROM #routine 
	WHERE
	file.folder = "remoteBrain/Daily-Docs/2024/January"
	SORT file.name DESC
```
