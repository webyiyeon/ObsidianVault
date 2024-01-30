```dataview
TABLE
	wakeup🌞, sleep🌜, dateformat(wakeup🌞, "HH:mm")- dateformat(sleep🌜, "HH:mm") AS "time"
FROM 
	#meal-log📝 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2024/January"
```
