
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
	workout🏋️
FROM 
	#workout-log💪 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/{{date:YYYY}}/{{date:MMMM}}"
```