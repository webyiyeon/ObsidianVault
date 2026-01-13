## Checking In on My Goals 🌱

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
    


## 🚀 How Close Am I to My Yearly Goals This Month?

- [ ] Did I exercise around three times a week?
- [ ] Did I take at least one post-meal walk each day?
- [ ] Did I spend at least 10 minutes tidying up each day?
- [ ] Did I eat my meals on time and log them honestly?
- [ ] Did I engage with Japanese at least once a week, even lightly?
- [ ] Did I save at least KRW 600,000 this month?
- [ ] Did I stay on top of my graduate classes and assignments?
- [ ] Did I write on my blog consistently this week and aim for one post this month?`
- [ ] Did I read for at least 5 minutes a day?
- [ ] Did I switch to recovery mode when my energy was low?               


## A Thankful Record

```dataview
TABLE 
	keyword🗝️, gratitude🙏, mood
FROM 
	#routine 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2026/01_January"
sort file.name	
```



## Sleep Log 
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
	file.folder = "remoteBrain/Daily-Docs/2026/01_January"
sort file.name
```



## Small Daily Wins
```dataview
TABLE WITHOUT ID
  link(file.name) as "Date",

  choice(
    length(filter(file.tasks, (t) => contains(t.text, "독서") AND t.completed)) > 0,
    "✔️", ""
  ) AS "read",

  choice(
    length(filter(file.tasks, (t) => contains(t.text, "다이어리") AND t.completed)) > 0,
    "✔️", ""
  ) AS "journal",

  choice(
    length(filter(file.tasks, (t) => contains(t.text, "정리정돈") AND t.completed)) > 0,
    "✔️", ""
  ) AS "tidy up",

  choice(
    length(filter(file.tasks, (t) => contains(t.text, "식사 기록") AND t.completed)) > 0,
    "✔️", ""
  ) AS "log meals",

  choice(
    length(filter(file.tasks, (t) => contains(t.text, "산책") AND t.completed)) > 0,
    "✔️", ""
  ) AS "walk after meals",

  choice(
    length(filter(file.tasks, (t) => contains(t.text, "운동") AND t.completed)) > 0,
    "✔️", ""
  ) AS "workout",

  choice(
    length(filter(file.tasks, (t) => contains(t.text, "일본어") AND t.completed)) > 0,
    "✔️", ""
  ) AS "Japanese study",

  choice(
    length(filter(file.tasks, (t) => contains(t.text, "블로그") AND t.completed)) > 0,
    "✔️", ""
  ) AS "write blog",

  choice(
    length(filter(file.tasks, (t) => contains(t.text, "그림") AND t.completed)) > 0,
    "✔️", ""
  ) AS "drawing practice"

FROM #routine
WHERE file.folder = "remoteBrain/Daily-Docs/2026/01_January"
SORT file.name ASC

```

