
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

```tracker
searchType: task.done  
searchTarget: 유산균 1알 먹기
folder: /remoteBrain/Daily-Docs/{{date:YYYY}}/{{date:MMMM}}
datasetName: 유산균
month:
```
