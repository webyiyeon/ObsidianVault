
```dataview
TABLE WITHOUT ID
	link(file.name) as "Day",
	file.tasks[0].completed AS "HABIT 1",
	file.tasks[1].completed AS "HABIT 2"
	FROM #routine 
	WHERE
	file.folder = "remoteBrain/Daily-Docs/{{date:YYYY}}/{{date:MMMM}}"
	SORT file.name DESC
	LIMIT 10
```
