## Checking In on My Goals 🌱

1. How are you feeling this month?  
    돈을 많이 썼고, 5월을 위한 빌드업의 달이라는 기분.
2. What goals have you started?  
    드럼! 딩가라운지 드럼 수업을 신청했다. (12회에 50만원이라는 거금)
3. What goals have you not started yet?  
    주 2회 이상 러닝을 못 했다. 그리고 러닝 기록도 깜빡함...
4. What obstacles are in your way?  
    역시 회사일까? 연봉이 나왔는데 만족스럽지 못 했다. 
5. How can you realistically overcome those obstacles?  
    드럼도 치고, 운동도 열심히 하면서 긍정적인 마음가짐으로 이겨내는 중.
6. Adjustments to goals  
    건강한 몸에 건강한 정신이 깃든다, 로 목표 변경. 그리고 한국사 능력 검정 시험 접수! 공무원 해보자.
7. TO DO this month in order to move forward  
    [대학원] AI 툴킷 과제 및 진도 체크, [자격증] 한국사 능력 검정 시험


## 🚀 How Close Am I to My Yearly Goals This Month?

- [x] Did I exercise around three times a week?
- [x] Did I take at least one post-meal walk each day?
- [x] Did I spend at least 10 minutes tidying up each day?
- [ ] Did I eat my meals on time and log them honestly?
- [ ] Did I engage with Japanese at least once a week, even lightly?
- [ ] Did I save at least KRW 600,000 this month?
- [x] Did I stay on top of my graduate classes and assignments?
- [ ] Did I write on my blog consistently this week and aim for one post this month?`
- [x] Did I read for at least 5 minutes a day?
- [x] Did I switch to recovery mode when my energy was low?


## A Thankful Record

```dataview
TABLE 
	keyword🗝️, gratitude🙏, mood
FROM 
	#routine 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2026/04_April"
sort file.name	
```



## Sleep Log 
```dataview
TABLE
	dateformat(wakeup🌞, "HH:mm") AS "wakeup🌞", 
	dateformat(sleep🌜, "HH:mm") AS "sleep🌜", 
	durationformat((wakeup🌞 - sleep🌜), "h'hr' m'min'") AS "time",
	("●" * number(durationformat((wakeup🌞 - sleep🌜), "h"))) 
	+ "○" * (10 - number(durationformat((wakeup🌞 - sleep🌜), "h"))) AS " ", mood
FROM 
	 #routine 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2026/04_April"
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
WHERE file.folder = "remoteBrain/Daily-Docs/2026/04_April"
SORT file.name ASC

```

