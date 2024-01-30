
```dataview
TABLE WITHOUT ID
	link(file.name) as "Day",
	file.tasks[0].completed AS "유산균 챙겨먹기",
	file.tasks[1].completed AS "운동하기",
	file.tasks[2].completed AS "건강하게 끼니 챙기기",
	file.tasks[3].completed AS "무지출 챌린지",
	file.tasks[4].completed AS "집 정리정돈하기",
	file.tasks[5].completed AS "개발 공부하기",
	file.tasks[6].completed AS "바깥 음식 안 먹기"
	FROM #routine 
	WHERE
	file.folder = "remoteBrain/Daily-Docs/2024/January"
	SORT file.name DESC
	LIMIT 10
```


```dataview
TABLE WITHOUT ID
	link(file.name) as "Day",
	choice(filter(file.tasks, (t) => t.habit = "유산균 챙겨먹기").completed, "✔️", "❌") AS "habit 1",
	choice(filter(file.tasks, (t) => t.habit = "habit 2").completed, "✔️", "❌") AS "habit 2"
	FROM #routine 
	WHERE
	file.folder = "remoteBrain/Daily-Docs/2024/January"
	SORT file.name DESC
	LIMIT 10
```
