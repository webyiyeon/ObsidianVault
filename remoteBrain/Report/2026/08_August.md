## Checking In on My Goals 🌱

1. How are you feeling this month?  
    왠지 시간이 느리게 가는 느낌이었달까? 컨텐츠를 많이 즐겼는데도 그렇게 느껴져서 신기했다!
2. What goals have you started?  
    야구 직관과 러닝!
3. What goals have you not started yet?  
    논문 작성 ㅠ.ㅠ
4. What obstacles are in your way?  
    ㅠㅠ 1월에 깨졌던 맥북 액정이 더 심각해져서 화면 보고 있기가 힘들었다.
5. How can you realistically overcome those obstacles?  
    노트북을 사다! 대신 거지가 됨...
6. Adjustments to goals  
    부자가 되기로 했으나, 거지만 면하는 것으로 만족하기.
7. TO DO this month in order to move forward  
    역시 운동, 운동만이 답이다.


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
	file.folder = "remoteBrain/Daily-Docs/2026/08_August"
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
	file.folder = "remoteBrain/Daily-Docs/2026/08_August"
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
WHERE file.folder = "remoteBrain/Daily-Docs/2026/08_August"
SORT file.name ASC

```

