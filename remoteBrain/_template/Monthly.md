
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
searchTarget: 무지출 챌린지 
folder: /remoteBrain/Daily-Docs/{{date:YYYY}}/{{date:MMMM}}
datasetName: No Expense Challenge 💰
bar: ™
```
