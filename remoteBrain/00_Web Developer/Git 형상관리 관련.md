## 특정 커밋 상태로 돌아가서 바로 `push`하는 방법

```
# 특정 커밋 상태로 되돌림 (기존 변경사항 삭제됨)
git reset --hard <commit-hash>  

# 강제로 원격 브랜치 덮어쓰기
git push origin HEAD --force  
```

## 커밋하지 않은 작업물이 있어서 `pull`이 막힌 경우

```
# 1. 현재 로컬에서 작업 중인 변경 사항을 임시 저장 (작업 트리를 깨끗하게 만듦)
git stash

# 2. 이제 에러 없이 원격 저장소의 최신 코드를 가져올 수 있습니다.
git pull origin 브랜치명

# 3. 임시 저장했던 내 작업물을 최신 코드 위에 다시 얹습니다.
git stash pop
```

