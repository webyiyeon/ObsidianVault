---
tistoryBlogName: web-yiyeon
tistoryTitle: Tistory와 Obsidian 연동하기
tistoryTags: 옵시디언, 옵시디언플러그인, 티스토리플러그인, 블로그관리
tistoryVisibility: "3"
tistoryCategory: "1145918"
tistoryPostId: "6"
tistoryPostUrl: https://web-yiyeon.tistory.com/6
tistorySkipModal: true
---

요즘은 애인이랑 같이 어떻게 하면 블로그 관리를 더 잘 할 수 있을지, 꾸준히 할 수 있을지에 대한 궁리를 자주 한다. 그러던 과정에서 'Obsidian'이라는 소프트웨어를 알게 되었다. 이미 수많은 플러그인이 만들어지고 응용되고 있는 것을 보면, 꽤 많은 사용자가 있음을 알 수 있었다. 약 2년 간의 Notion 유저로서 이미 마크다운(Markdown)에는 익숙함을 느끼고 있었고, 더 늦지 않게 나도 빨리 따라 잡아야겠다! 싶어서 애인에게 속성 강의를 들었다. 이거 보니 잘만 활용하면 마크다운 기반의 문서를 작성할 때 기존에 쓰던 노션이나 비주얼 스튜디오보다 훨씬 쉽고 편하게 관리할 수 있다는 생각이 들었다. (특히 노션은 네트워크 환경이 안정적이지 않은 곳에선 자주 버벅이곤 했다.) 그래서 찾아봤다. Tistory 블로그 게시글을 Obsidian에서 작성하고 업로드 할 수 있는 플러그인.
<br/>
[![Obsidian Tistory Plugin 제작자 블로그](1145918_1.png)](https://anpigon.tistory.com/214)*클릭 시 '안피곤'님의 블로그로 넘어갑니다.*
<br/>
너무 고맙게도, 옵시디언 한국 유저들이 티스토리 플러그인을 꽤 여러 종류 만들어왔다. 그 중에 아직까지도 꾸준히 업데이트 되고 있고, 굉장히 상세하고 정확하게 만들어주신 개발자님의 블로그 링크를 첨부했다. 나는 내가 직접 만들어야하나 싶어 API key까지 발급 받았다가 이 게시글을 찾고 바로 적용시켰다. 쏘 이지 쏘 간편. 위 링크에 들어가면 상세하게 설치법부터 사용법까지 작성해두셨다. 참고해서 티스토리 블로그를 편하게 관리해보자! 
<br/>
***
<br>
내가 앞으로 쓸 예정인 디렉토리 형태는 다음과 같다.

```bash
├── Obsidian Vault
│   └── remoteBrain
│       ├── blog
│       │   ├── Tistory
│       │   │   └── Tistory와 Obsidian 연동하기.md
│       │   └── Webyiyeon.github.io
```
<br/>

Obsidian Vault 안에 blog라는 하위 폴더를 두고, 앞으로의 게시글을 Obsidian notes 형태로 두는 것이다. 이렇게 하면 게시판을 내 로컬 폴더에 옮겨놓은 듯한 느낌! 수정할 때도 간단하다. `Command + P` 하고 `Tistory: Publish to Tistory`만 클릭하면 끝. 아 삶이 엄청 쾌적해진 기분이다. 오늘 블로그 폭풍 업로드 해야지. 😎

 
