### Checking In on My Goals 🌱

1. how are you feeling?
2. what goals have you started?
3. what have you not started?
4. what obstacles are in your way?
5. how can you overcome the obstacles?
6. adjustments to goals (changes, omissions, additions!):
7. TO DO in order to reach these goals:


### 🚀 How Close Am I to My Yearly Goals This Month ?

- [ ] 건강한 몸에 건강한 마음이 깃든다. 매일 30분 이상 운동하기.
- [x] 점심 & 저녁 식후 3~5분이라도 산책하기.
- [ ] 오전 오후 저녁 관계없이 하루에 최소 10분은 정리 정돈에 할당하기
- [x] 식사를 제 시간에 챙겨먹고 기록하기. (솔직하게)
- [ ] 일주일에 최소 1번 이상 일본어 공부하기. (가벼운 학습지)
- [x] 하반기(6월 이후)에는 해외 여행 가기.
- [ ] 저축하는 비용을 절대 미루지 않기. 매달 60만원 이상 저축하기.
- [ ] 대학원 생활 열심히 하기. 레포트, 수업 밀리지 않을 것.
- [ ] 일주일 1회 블로그 업로드하기.
- [x] 일주일 최소 1번 이상 독서하기.


## Summary Datas

```dataview
TABLE 
	keyword🗝️, gratitude🙏, mood
FROM 
	#routine 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2025/05_May"
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
	file.folder = "remoteBrain/Daily-Docs/2025/05_May"
sort file.name
```



### Meal Logs
```dataview
TABLE 
	breakfast🍳, lunch🍚, dinner🥗, snack🍬, water💧, (bfcals + lccals + dncals + sncals) AS "calrories🪄"
FROM 
	#meal-log📝 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2025/05_May"
sort file.name	
```


### Workout Logs
```dataview
TABLE 
	workout🏋️, workout-type as type, workout-routine as routine 
FROM 
	#workout-log💪 
WHERE 
	file.folder = "remoteBrain/Daily-Docs/2025/05_May"
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
	file.folder = "remoteBrain/Daily-Docs/2025/05_May"
	SORT file.name ASC
```

