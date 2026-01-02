---
wakeup🌞:
sleep🌜:
mood:
workout🏋️:
workout-type:
workout-routine:
gratitude🙏:
keyword🗝️:
recovery: false
tags:
  - meal-log📝
  - study-log📓
  - workout-log💪
  - routine
---

<%*
	/* Parsing Date */ 
	currentDate  = moment(tp.file.title, 'YYYY-MM-DD dd')
	previousDate = moment(tp.file.title, 'YYYY-MM-DD dd').add(-1, "days")
	nextDate     = moment(tp.file.title, 'YYYY-MM-DD dd').add(+1, "days")

	/* Previous date parsing */
	previousDate_year  = previousDate.format("YYYY")
	previousDate_month = previousDate.format("MM_MMMM")
	previousDate_ymd   = previousDate.format("YYYY-MM-DD")
	previousDate_wday  = previousDate.format("ddd") 

	/* Past date parsing */ 
	nextDate_year  = nextDate.format("YYYY")
	nextDate_month = nextDate.format("MM_MMMM") 
	nextDate_ymd   = nextDate.format("YYYY-MM-DD")
	nextDate_wday  = nextDate.format("ddd")
	
-%>🔺 [[remoteBrain/Daily-docs/<% previousDate_year %>/<% previousDate_month%>/<% previousDate_ymd %> <% previousDate_wday %> | <% previousDate_ymd %> <% previousDate_wday %>]]
🔻 [[remoteBrain/Daily-docs/<% nextDate_year %>/<% nextDate_month %>/<% nextDate_ymd %> <% nextDate_wday %> | <% nextDate_ymd %> <% nextDate_wday %>]]
___
<h1> <center>⏰TimeTable </center> </h1>

```gEvent
type: week
date: <% tp.file.title %>
navigation: false
showAllDay: true
hourRange: [8, 24]
offset: -2
include: ["Default", "Todoist", "Korea", "Work", "Study", "Game"]
timespan: 7
```

--- 
# Today's GOAL (Top 3)

- [ ] 
- [ ] 
- [ ] 

# Today’s Tasks


# Delayed Tasks
```tasks
not done
(tags include #work💼) OR (tags include #chores🧺) OR (tags include #todo)
path does not include <%tp.file.title%>
hide backlink
```

# Notes



# Routines

<%*
const weekday = tp.date.now("dddd");
const dayOfMonth = tp.date.now("D");

// ──────────────────
// 회복 모드 설정 (true / false)
// ──────────────────
let recoveryMode = tp.frontmatter.recovery === true;

let checklist = [];
let totalTasks = 0;


// ──────────────────
// Daily 루틴
// ──────────────────

// 1. 독서
// 2. 다이어리 쓰기
// 3. 정리정돈
// 4. 식사 기록
// 5. 식후 산책
// 6. 대학원 생활
checklist.push("- [ ] 5분 독서하기."); totalTasks++;
checklist.push("- [ ] 10분 다이어리 쓰기 (한 줄도 OK)."); totalTasks++;
checklist.push("- [ ] 10분 정리정돈 하기."); totalTasks++;
checklist.push("- [ ] 10분 식사 제시간에 챙겨 먹고 기록하기."); totalTasks++;
checklist.push("- [ ] 5분 식후 산책하기."); totalTasks++;
checklist.push("- [ ] 30분 대학원 수업/논문/레포트 마감 밀리지 않기."); totalTasks++;

// ──────────────────
// Weekly 루틴 (회복 모드 OFF일 때만)
// ──────────────────

if (!recoveryMode) {
	// 7. 운동 — 주 3회 (화/목/토 기준)
	if (["Tuesday", "Thursday", "Saturday"].includes(weekday)) {
	  checklist.push("- [ ] 50분 운동하기 (주 3회 목표).");
	  totalTasks++;
	}
	
	// 8. 일본어 공부 — 주 1회 (목요일)
	if (weekday === "Thursday") {
	  checklist.push("- [ ] 10분 일본어 공부하기 (주 1회 목표).");
	  totalTasks++;
	}
	
	// 9-1. 블로그 작성 — 주 1회 (일요일)
	if (weekday === "Sunday") {
	  checklist.push("- [ ] 30분 블로그 글 작성하기 (초안/메모 OK).");
	  totalTasks++;
	}
	
	// 10. 그림 공부 — 주 2회 (수/일)
	if (["Wednesday", "Sunday"].includes(weekday)) {
	  checklist.push("- [ ] 70분 그림 공부하기 (주 2회 목표).");
	  totalTasks++;
	}
}

// ──────────────────
// Monthly 루틴
// ──────────────────

// 9-2. 블로그 업로드 — 월 1회 (매달 15일 리마인드)
if (dayOfMonth === "15" && !recoveryMode) {
  checklist.push("- [ ] 50분 블로그 월 1회 업로드하기.");
  totalTasks++;
}

// 11. 저축 — 월 1회 (매달 10일: 월급일) 
if (dayOfMonth === "10") {
  checklist.push("- [ ] 월 저축 60만원 이상 하기.");
  totalTasks++;
}

// ──────────────────
// 출력
// ──────────────────

tR += `## 오늘의 루틴\n`;
tR += checklist.join("\n");

tR += `\n\n---\n`;
tR += `### 🧘 회복 모드\n`;
tR += recoveryMode
  ? "오늘은 **회복 모드 ON** — 최소 루틴만 진행합니다.\n"
  : "회복 모드 OFF — 전체 루틴 진행 중입니다.\n";

tR += `\n---\n`;
tR += `### 📊 오늘의 루틴 성공률\n`;
tR += `- 체크 완료 / 전체: **□ / ${totalTasks}**\n`;
tR += `- 오늘 목표: **${totalTasks}개 중 가능한 만큼**\n`;
%>
