
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

```tracker
searchType: task.done  
searchTarget: 'Total\s+(?[0-9]+)\s+Pomo'  
folder: /remoteBrain/Daily-Docs/2024/January
datasetName: 유산균
month:
```
