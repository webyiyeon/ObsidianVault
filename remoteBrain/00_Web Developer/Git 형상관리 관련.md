
#### 특정 커밋 상태로 돌아가서 바로 `push`하는 방법

```
git reset --hard <commit-hash>  # 특정 커밋 상태로 되돌림 (기존 변경사항 삭제됨)
git push origin HEAD --force  # 강제로 원격 브랜치 덮어쓰기
```


