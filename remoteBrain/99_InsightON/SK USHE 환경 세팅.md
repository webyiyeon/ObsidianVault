## gradle 못 찾는 경우

![[Pasted image 20260304171614.png]]

폐쇄망에서 gradle 경로를 못 찾는 경우가 있음
`.gradle` 에 있는 cache를 기존 다른 사용자의 cache로 채워준 다음, gradle 오프라인 옵션으로 실행

```
gradle --offline
```
