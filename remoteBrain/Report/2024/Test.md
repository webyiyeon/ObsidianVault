```dataview
TABLE
	dateformat(wakeup🌞, "HH:mm") AS "wakeup🌞", 
	dateformat(sleep🌜, "HH:mm") AS "sleep🌜", 
	dateformat((wakeup🌞 - sleep🌜), "HH:mm") AS "time"
FROM 
	#meal-log📝 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2024/January"
```
