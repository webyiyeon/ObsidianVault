## Checking In on My Goals 🌱

1. How are you feeling this month?  
    번아웃이 올 뻔 했으나? 토스트아웃으로 극복했다.
2. What goals have you started?  
    그림 그리기! 구마 선생님 강의를 듣기 시작함. 물론 4주만 하고 종료할 거지만... 
3. What goals have you not started yet?  
    정보보안기사 공부하기. 공부해야지, 해놓고 업무+게임에 집중해버렸다.
4. What obstacles are in your way?  
    연봉 협상에 대한 걱정?
5. How can you realistically overcome those obstacles?  
    이러나 저러나 1년 이상 더 다녀야 하는 회사니, 의미 부여하지 말고 적당히 만족하면서 다니자.
6. Adjustments to goals  
    연봉을 올리는 것에는 잠시 마음을 내려놓고, 
7. TO DO this month in order to move forward  
    


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
	file.folder = "remoteBrain/Daily-Docs/2026/03_March"
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
	file.folder = "remoteBrain/Daily-Docs/2026/03_March"
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
WHERE file.folder = "remoteBrain/Daily-Docs/2026/03_March"
SORT file.name ASC

```

