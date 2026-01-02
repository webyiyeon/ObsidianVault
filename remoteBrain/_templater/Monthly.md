### Checking In on My Goals 🌱

1. How are you feeling this month?  
    (에너지 수준, 멘탈 상태, 전체적인 컨디션은 어땠는지)
    
2. What goals have you started?  
    (작게라도 시작한 것들, 시도만 해본 것도 포함)
    
3. What goals have you not started yet?  
    (아직 손도 못 댄 것들, 미뤄진 이유는 무엇인지)
    
4. What obstacles are in your way?  
    (시간, 체력, 감정, 환경, 우선순위 등)
    
5. How can you realistically overcome those obstacles?  
    (의지를 끌어올리는 게 아니라, 조건을 바꾸는 방식으로)
    
6. Adjustments to goals  
    (이번 달에 기준을 낮추거나, 잠시 빼거나, 새로 추가할 것들)
    
7. TO DO this month in order to move forward  
    (이번 달에 “이것만 하면 잘했다”고 말할 수 있는 최소 행동)
    

---

### 🚀 How Close Am I to My Yearly Goals This Month?

- [ ] Did I exercise around three times this week?
- [ ] Did I take at least one walk after a meal today?
- [ ] Did I spend at least 10 minutes tidying up today?
- [ ] Did I eat my meals on time and log them honestly?
- [ ] Did I engage with Japanese at least once this week?
- [ ] Did I save at least KRW 600,000 this month?
- [ ] Did I stay on top of my graduate classes and assignments?
- [ ] Did I write on my blog a little this week and aim for one post this month?
- [ ] Did I read for at least 5 minutes today?
- [ ] Did I switch to recovery mode when my energy was low?               


## Summary Datas

```dataview
TABLE 
	keyword🗝️, gratitude🙏, mood
FROM 
	#routine 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/{{date:YYYY}}/{{date:MM}}_{{date:MMMM}}"
sort file.name	
```



### Sleep Tracker
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
	file.folder = "remoteBrain/Daily-Docs/{{date:YYYY}}/{{date:MM}}_{{date:MMMM}}"
sort file.name
```


### Workout Logs
```dataview
TABLE 
	workout🏋️, workout-type as type, workout-routine as routine 
FROM 
	#workout-log💪 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/{{date:YYYY}}/{{date:MM}}_{{date:MMMM}}"
sort file.name
```


### Habit Tracker 
```dataview
TABLE WITHOUT ID
	link(file.name) as "Date",
	choice(file.tasks[0].completed, "✔️", " ") AS "영양제 챙겨먹기",
	choice(file.tasks[1].completed, "✔️", " ") AS "운동하기",
	choice(file.tasks[2].completed, "✔️", " ") AS "도시락 챙기기",
	choice(file.tasks[3].completed, "✔️", " ") AS "외식 안하기",
	choice(file.tasks[4].completed, "✔️", " ") AS "무지출 챌린지",
	choice(file.tasks[5].completed, "✔️", " ") AS "집안일 잘하기",
	choice(file.tasks[6].completed, "✔️", " ") AS "전공 공부하기",
	choice(file.tasks[7].completed, "✔️", " ") AS "일본어 공부하기",
	choice(file.tasks[8].completed, "✔️", " ") AS "독서하기"
	FROM #routine 
	WHERE
	file.folder = "remoteBrain/Daily-Docs/{{date:YYYY}}/{{date:MM}}_{{date:MMMM}}"
	SORT file.name ASC
```

