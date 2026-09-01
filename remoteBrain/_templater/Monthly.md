<%*
/* Periodic-Notes replacement: computes the target month's path, opens
   the note if it already exists (deleting the blank stub Templater
   just made), or moves this stub into place if it's a genuinely new
   month. Pull the month from the file's own path when it's already
   sitting in a dated Report/YYYY/MM_Month.md location (e.g. created
   by clicking a month on the calendar); otherwise fall back to the
   current month for the Alt+3 / generic-stub case. */
const stubMonthMatch = tp.config.target_file.path.match(/Report\/(\d{4})\/(\d{2})_\w+\.md$/);
const currentDate = stubMonthMatch ? window.moment(`${stubMonthMatch[1]}-${stubMonthMatch[2]}-01`, "YYYY-MM-DD") : window.moment();
const monthlyFolder = `remoteBrain/Report/${currentDate.format("YYYY")}`;
const monthlyFilename = currentDate.format("MM_MMMM");
const monthlyTargetPath = `${monthlyFolder}/${monthlyFilename}.md`;
const monthlyAlreadyAtTarget = tp.config.target_file.path === monthlyTargetPath;
const monthlyExisting = monthlyAlreadyAtTarget ? null : app.vault.getAbstractFileByPath(monthlyTargetPath);
-%>
## Checking In on My Goals 🌱

1. How are you feeling this month?  
    
2. What goals have you started?  
    
3. What goals have you not started yet?  
    
4. What obstacles are in your way?  
    
5. How can you realistically overcome those obstacles?  
    
6. Adjustments to goals  
    
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
	file.folder = "remoteBrain/Daily-Docs/<% currentDate.format("YYYY") %>/<% currentDate.format("MM_MMMM") %>"
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
	file.folder = "remoteBrain/Daily-Docs/<% currentDate.format("YYYY") %>/<% currentDate.format("MM_MMMM") %>"
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
WHERE file.folder = "remoteBrain/Daily-Docs/<% currentDate.format("YYYY") %>/<% currentDate.format("MM_MMMM") %>"
SORT file.name ASC

```
<%*
if (monthlyExisting) {
	const stub = tp.config.target_file;
	const openLeaf = app.workspace.getLeavesOfType("markdown").find(l => l.view?.file?.path === monthlyExisting.path);
	if (openLeaf) {
		app.workspace.revealLeaf(openLeaf);
	} else {
		await app.workspace.getLeaf(false).openFile(monthlyExisting);
	}
	tR = "";
	if (stub && stub.path !== monthlyExisting.path) {
		setTimeout(() => { app.vault.delete(stub).catch(() => {}); }, 500);
	}
} else if (!monthlyAlreadyAtTarget) {
	await tp.file.move(`${monthlyFolder}/${monthlyFilename}`);
}
-%>

