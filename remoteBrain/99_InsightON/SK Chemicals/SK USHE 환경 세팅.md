## gradle 못 찾는 경우

![[Pasted image 20260304171614.png]]

폐쇄망에서 gradle 경로를 못 찾는 경우가 있음
`.gradle` 에 있는 cache를 기존 다른 사용자의 cache로 채워준 다음, gradle 오프라인 옵션으로 실행

```
gradle --offline
```


`.m2` 폴더도 이전에 사용했던 폴더로 덮어쓰기 해줄 것


## 환경변수
시스템 변수(S)
`JAVA_HOME` `C:\jdk-17.0.12`

사용자 변수
- Path
	`%JAVA_HOME%\bin`
	`C:\gradle-7.6.1\bin`
	`C:\node-v20.18.0-win-x64`

