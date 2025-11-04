
#### 6월 말 ~ 7월 초 선배포 

- [x] 작업허가서 #web #mobile
	- [x] 안전환경작업실시계획서 #web #mobile
	- [x] 작업허가 #web #mobile
	- [x] 작업현황 #web #mobile
	- [x] 작업허가서출력 #web
- [x] 작업위험성평가 (AI JSA 제외) #web
	- [x] 작업안전분석 목록
	- [x] 평가단계별 완료목록
	- [x] JSA 정기평가대상
	- [x] JSA 정기평가/개선계획
- [x] 사고관리 #web
	- [x] 사내사고
	- [x] 아차사고
	- [x] 아차사고 집계
- [x] 문서관리
	- [x] 절차서
	- [x] 매뉴얼
	- [x] 지침서
- [x] 안전점검 #web #mobile
	- [x] 안전점검 #mobile
	- [x] 개선조치
	- [x] 안전점검실적
	- [x] 안전점검통계
	- [x] 순회점검(사외)
	- [x] 순회점검(사내)

- 선배포를 위해 추가 작업 필요
	- [x] 기준정보 번역
	- [ ] HR Interface
	- [ ] 작업허가서 기준정보 변경 (중국 기준만)
	- [ ] AWS / Linux / MSSQL 환경 세팅
	- [x] Jasper 번역
	- [ ] 모바일 Teams In App 설정 (siteCd, langCd)

#### 배포 무관 변경점

- [x] 협력사 포탈 회원가입 시 개인정보 동의 추가
	- [x] 회원가입/탈퇴 요청 → SHE 담당자 확인 → 승인 시 가입/탈퇴





#### 일정

- 6월 말: 선배포 및 1차 소스 전달
- 7월: 양수석님 중국 교육 가능성 有
- 7월 15일 ~ 8월 15일: 중국 산터우 작업 
- 8월 말 ~ 9월: 2차 소스 전달 (최종)
- 10월: 울산공장, 산터우 교육 


#### 서버 
[인사이트온 SKMU / SHE_GEN2 사내 개발 서버](http://e3.insighton.co.kr:9000/loginError "http://e3.insighton.co.kr:9000/")

ID: e3-v3-dev  
PW: 1q2w3e4r5t

개발서버에 배포 시 커밋 후 해당 프로젝트 빌드만 눌러주면 됩니다.


#### 운영일지작성 조회 쿼리 관련
현재 데이터가 1:N 구성으로 되어있으나, 화면 단에서는 1:1인 것으로 판정 
일단 MAX 조인 해두었지만 차후 로직 변경 필요 가능성 有

#### Jenkins Build & Deploy

##### 임직원 포탈 
###### backend-java
- spring profiles를 WAS 서버의 service 설정에 삽입 `--spring.profiles.active=prod` / `--spring.profiles.active=staging` 
	- 경로: `/etc/systemd/system/`
- 매개변수: SLAVE-JAVA
- Git 연동: bitbucket/scm/ushe/backend-java.git, i24474
- Execute Windows batch command (윈도우 환경 커맨드 라인)
	```
	set GRADLE_USER_HOME=D:\USHE\.gradle
	set MAVEN_USER_HOME=D:\USHE\.m2
	set SPRING_PROFILES_ACTIVE=prod (현재 여기 정상 동작 안 함, WAS 서버에 작성)
	call gradlew.bat clean build --offline --no-daemon 
	if exist build\libs\*.jar (echo JAR file found) else (echo NOT FILE FOUND)
	```
- 빌드 후 조치, Deploy an application to AWS CodeDeploy
	- AWS CodeDeploy Application Name: skch-prod-she / skch-dev-she 
	- AWS CodeDeploy Deployment Group: skch-pod-she-ap / skch-dev-she-ap
	- AWS Region: AP_NORTHEAST_2
	- S3 Bucket: skch-backbone-prod-artifacts
	- S3 Prefix: she/
	- Include Files: build/libs/, appspec.yml, start-deploy.sh
	- Use Access/Secret Key 

###### frontend-react
- 매개변수: SLAVE-JAVA
- Git 연동: bitbucket/scm/ushe/frontend-react.git, i24474
- Execute Windows batch command (윈도우 환경 커맨드 라인)
	```
	chcp 65001 (콘솔 출력 인코딩 용)
	set NODE_HOME=D:\USHE\node-22.17.1
	set PATH=%NODE_HOME%;%NODE_HOME%\node_modules\npm\bin;%PATH%
	set NODE_OPTIONS=--max-old-space-size=4096 (heap memory 증가용)
	set CI=false (warning 시에도 빌드 성공 처리)
	node -v (version 확인용)
	call yarn install --frozen-lockfile
	call yarn run build-prod / call yarn run build-staging
	```
- 빌드 후 조치, Deploy an application to AWS CodeDeploy
	- AWS CodeDeploy Application Name: skch-prod-she / skch-dev-she 
	- AWS CodeDeploy Deployment Group: skch-pod-she-ap / skch-dev-she-ap
	- AWS Region: AP_NORTHEAST_2
	- S3 Bucket: skch-backbone-prod-artifacts
	- S3 Prefix: she/
	- Include Files: build/, appspec.yml, start-deploy.sh
	- Use Access/Secret Key 


##### 임직원 모바일 포탈(teams in app) ==개발 서버 없음==
###### backend-mobile-java 
- spring profiles를 WAS 서버의 service 설정에 삽입 `--spring.profiles.active=prodm`  
	- 경로: `/etc/systemd/system/
- 매개변수: SLAVE-JAVA
- Git 연동: bitbucket/scm/ushe/backend-java.git, i24474
- Execute Windows batch command (윈도우 환경 커맨드 라인)
	```
	chcp 65001 (콘솔 출력 인코딩 용)
	set GRADLE_USER_HOME=D:\USHE\.gradle
	set MAVEN_USER_HOME=D:\USHE\.m2
	set SPRING_PROFILES_ACTIVE=stagingp (현재 여기 정상 동작 안 함, WAS 서버에 작성)
	move "appspec-partner.yml" "appspec.yml"
	call gradlew.bat clean build --offline --no-daemon
	if exist build\libs\*.jar (echo JAR file found) else (echo NOT FILE FOUND)
	```
- 빌드 후 조치, Deploy an application to AWS CodeDeploy
	- AWS CodeDeploy Application Name: skch-prod-she-bp
	- AWS CodeDeploy Deployment Group: skch-prod-she-bp
	- AWS Region: AP_NORTHEAST_2
	- S3 Bucket: skch-backbone-prod-artifacts
	- S3 Prefix: she-bp/
	- Include Files: build/libs/, appspec.yml, start-deploy-mobile.sh
	- Use Access/Secret Key 


###### frontend-mobile-react
- 매개변수: SLAVE-JAVA
- Git 연동: bitbucket/scm/ushe/frontend-react.git, i24474
- Execute Windows batch command (윈도우 환경 커맨드 라인)
	```
	chcp 65001 (콘솔 출력 인코딩 용)
	set NODE_HOME=D:\USHE\node-22.17.1
	set PATH=%NODE_HOME%;%NODE_HOME%\node_modules\npm\bin;%PATH%
	set NODE_OPTIONS=--max-old-space-size=4096 (heap memory 증가용)
	set CI=false (warning 시에도 빌드 성공 처리)
	move "appspec-partner.yml" "appspec.yml"
	node -v (version 확인용)
	call yarn install --frozen-lockfile
	call yarn run build-prod / call yarn run build-staging
	```
- 빌드 후 조치, Deploy an application to AWS CodeDeploy
	- AWS CodeDeploy Application Name: skch-prod-she-bp / skch-dev-she-bp
	- AWS CodeDeploy Deployment Group: skch-prod-she-bp / skch-dev-she-bp
	- AWS Region: AP_NORTHEAST_2
	- S3 Bucket: skch-backbone-prod-artifacts / skch-backbone-dev-artifacts
	- S3 Prefix: she-bp/${BUILD_NUMBER}
	- Include Files: build/, appspec.yml, start-deploy.sh
	- Use Access/Secret Key 



##### 협력사 포탈
###### backend-partner-java 
- spring profiles를 WAS 서버의 service 설정에 삽입 `--spring.profiles.active=prodp` / `--spring.profiles.active=stagingp` 
	- 경로: `/etc/systemd/system/
- 매개변수: SLAVE-JAVA
- Git 연동: bitbucket/scm/ushe/backend-java.git, i24474
- Execute Windows batch command (윈도우 환경 커맨드 라인)
	```
	chcp 65001 (콘솔 출력 인코딩 용)
	set GRADLE_USER_HOME=D:\USHE\.gradle
	set MAVEN_USER_HOME=D:\USHE\.m2
	set SPRING_PROFILES_ACTIVE=stagingp (현재 여기 정상 동작 안 함, WAS 서버에 작성)
	move "appspec-partner.yml" "appspec.yml"
	call gradlew.bat clean build --offline --no-daemon
	if exist build\libs\*.jar (echo JAR file found) else (echo NOT FILE FOUND)
	```
- 빌드 후 조치, Deploy an application to AWS CodeDeploy
	- AWS CodeDeploy Application Name: skch-prod-she-bp / skch-dev-she-bp
	- AWS CodeDeploy Deployment Group: skch-prod-she-bp / skch-dev-she-bp
	- AWS Region: AP_NORTHEAST_2
	- S3 Bucket: skch-backbone-prod-artifacts / skch-backbone-dev-artifacts
	- S3 Prefix: she-bp/
	- Include Files: build/libs/, appspec.yml, start-deploy-partner.sh
	- Use Access/Secret Key 

###### frontend-partner-react
- 매개변수: SLAVE-JAVA
- Git 연동: bitbucket/scm/ushe/frontend-react.git, i24474
- Execute Windows batch command (윈도우 환경 커맨드 라인)
	```
	chcp 65001 (콘솔 출력 인코딩 용)
	set NODE_HOME=D:\USHE\node-22.17.1
	set PATH=%NODE_HOME%;%NODE_HOME%\node_modules\npm\bin;%PATH%
	set NODE_OPTIONS=--max-old-space-size=4096 (heap memory 증가용)
	set CI=false (warning 시에도 빌드 성공 처리)
	move "appspec-partner.yml" "appspec.yml"
	node -v (version 확인용)
	call yarn install --frozen-lockfile
	call yarn run build-prod / call yarn run build-staging
	```
- 빌드 후 조치, Deploy an application to AWS CodeDeploy
	- AWS CodeDeploy Application Name: skch-prod-she-bp / skch-dev-she-bp
	- AWS CodeDeploy Deployment Group: skch-prod-she-bp / skch-dev-she-bp
	- AWS Region: AP_NORTHEAST_2
	- S3 Bucket: skch-backbone-prod-artifacts / skch-backbone-dev-artifacts
	- S3 Prefix: she-bp/${BUILD_NUMBER}
	- Include Files: build/, appspec.yml, start-deploy.sh
	- Use Access/Secret Key 


#### 데이터 마이그레이션

##### 변경관리
C1S0109010_01 ~ C1S0109010_04 

##### 가동 전 안전점검
C1S0108030_01 ~ C1S0108030_05 
C1S0108010_02 (기준정보) 



#### 가동 전 안전점검

##### 1차 

==리스트 화면==
- [x] 단계 정리 (요청 -> 결과서 및 결과보고 -> 조치결과 -> 승인)

==공통==  
- [x] 신규등록 시 탭이 무조건 1번탭으로 가도록 조치
- [x] 결과서 탭의 점검대상 점검표와 기기별 점검사항의 점검항목 명 통일 (공통코드에서 수정하면 됨)

==요청서 탭 ==
**CASE 1. 신규 등록(직접등록)**  
- [x] 대상 구분 기준 선택 시 변경관리 대상 여부 자동체크 (1, 2 등급 = "N" / 3, 4등급 = "Y")
- [x] 대상 구분 기준 선택 시 요청대상 자동 변경 (1, 2 등급 = "요청" / 3, 4등급 = "미요청")
- [x] 요청대상 , 요청부서(팀), 단위공장명, 가동개시일, 점검일, 변경관리 대상 전부 필수값 표시 (\*)
- [x] 점검 분야 및 수신처의 공정,운전 대상자 필수값 (저장 시 비어있으면 선택하도록)
- [x] 필수값의 입력 여부 확인 및 Alert창 추가

**CASE 2.상세보기**  
- [x] Detail 쿼리에 saf_chng_no 열 컬럼이 없다는 오류
- [x] 대상 구분 기준의 등급 변경 시 "선택 할 수 없습니다." 뜨고 체크 사라짐

**CASE 3. 저장 후 상세보기에서 결재요청**  
- [x] 결재요청명 변경 필요 -> "가동 전 안전점검 요청서 결재요청"

==결과서 탭==  
**CASE 1. 요청서에서 넘어온 직 후(기안자 입장 - 요청대상 "Y")**  
- [x] 승인요청 버튼은 전부 확인완료가 되었을 때 show
- [x] 점검대상 점검표의 공통사항은 무조건 "대상"으로 고정 (변경 못하도록)
- [x] 기기별 점검사항은 확인요청 하기 전에는 볼 수 만 있고, 점검결과 선택 / 지적사항 입력 못하도록 막기
- [x] 저장 시 바로 확인요청이 되는것이 아닌, 별도의 확인요청 버튼 분리

**CASE 2. 결과서 확인요청 받은 상태(각 담당자 입장)**  
- [x] 점검대상 점검표는 수정 불가 해야함
- [x] 저장 버튼 필요(임시저장 기능)

**CASE 3. 각 담당자들이 확인 완료 후 (기안자 입장 - 요청대상 "Y")**  
- [x] 담당자들이 확인완료 했으나 이후 버튼 보이지 않음

**CASE 4. 요청서에서 넘어온 직 후(기안자 입장 - 요청대상 "N")**  
- [x] 저장 버튼 안보임
- [x] 전체적으로 입력 불가 상태

##### 2차

**변경 관리**

- [x] SHE 절차서 클릭 시 상단 위험성 평가 체크 ‘해당 없음’ 표기되어야 함
- [x] SHE 절차서 클릭 시 NO, 사유가 하단 이상한 곳에 배치되어 있음
- [x] ==공정 위험 지수 평가표 Upgrade 필요==  ⇒ 25/10/20 김종현 책임님한테 전달 받기
- [x] 첨부 파일 필수값임
- [x] 승인 완료 후 가동 전 안전점검 연동에서 단위 공정명 연동이 안 됨 
	- [x] **가동 전 안전점검**에서 단위공정명 아닌 단위공정 코드로 관리할 것
- [x] 3등급으로 변경 관리를 했는데 가동 전 안전점검에서 등급을 1, 2로 변경하려고 하면 알럿 메시지가 발생해야 함


**가동 전 안전점검**

- [x] ==등급별 점검 담당자 기준 팝업 추가==
- [x] 기기별 점검사항 2개씩 중복으로 보임
- [x] 기기별 점검사항(공통)에서 선택하면 상단 라디오 버튼에 자동으로 매핑되어야 하고 상단 영역은 제어 불가 
- [x] 확인 요청 기능
	- [x] 확인 요청 시, 선택한 데이터 다 풀림  *⇒ save 기능인지?*
	- [x] 확인 요청 후 담당자가 점검 팀원의 상태를 바꿀 수 있어야 함
- [x] 확인 완료 버튼이 눌렸어도 계속 떠 있음 (누군가 한 명이라도 남아 있으면 계속 유지)ㅐ
- [ ] 결재 요청 시 결재 라인에 친전 포함되어야 함  *⇒ 공통 모듈 수정?*
- [x] 기기별 점검사항 select box 선택이 안 됨
- [ ] 결재 라인 타이밍상 안 나오는 케이스가 있음  ⇒ 장기전
- [x] 가동 전 안전점검 조치결과에서 저장 시 에러 메시지 발생
- [x] 변경 관리 대상 라디오 버튼 disable 처리
- [x] 대상 구분 기준에서 1등급, 2등급 시 미대상 / 3, 4등급 시 변경 관리 대상
- [x] 가동 전 안전점검 조치결과 탭에서 하단 조치결과 계획일자 입력 안 됨 + 조치결과 전체 다 안 됨
	⇒ 조치결과 담당자만 수정 가능한 부분으로, 해당 사항은 추가 테스트 후 피드백 필요
	⇒ 안내문구 추가('개선조치 담당자만 수정 가능합니다.')


##### 3차
**변경관리(>저장 단계)**

- [x] 적용항목에 가동전 안전점검 무조건 체크(고정)
- [x] SHE절차서 선택 안되어있는데 SHENo 등 텍스트박스 보임
- [x] 사용자 검색 팝업 오픈 시 API호출 오류 발생 팝업  *⇒ 공통/일시적 오류로 판단*
- [x] 변경관리 저장 후 또 저장 시 관련자료 > 완료일자 유효성을 확인 하는데 관련자료의 유효성은 변경관리 위원장 승인 다음 단계에서만 확인 하면 될듯  (GSHE는 유효성 x) *⇒ 일단 유효성 삭제*
- [x] 완료일자 입력 후 저장 시 Object.toString() 발생(저장 불가)
- [x] 변경관리 저장 시 Object.toString() 발생(간헐적으로 발생 하는지는 모름)   *⇒ NullPointerException 추가 *


##### 4차
**가동전안전점검**

- [x] 요청서
	- [x] 결재 라인 (일자/시간 포함)
	- [x] 요청서_\[안전점검명]\_날짜.pdf
- [ ] 기기별 점검사항
	- [ ] '구분' 항목 보이게 수정
	- [x] 기기별 점검사항_\[안전점검명]\_날짜.pdf
- [ ] 결과서 
	- [x] 결재 라인 보이지 않음(일자/시간 포함) (기존 절차서 내의 양식과 상이함)
	- [ ] 출력물의 양식 Table에서 박스 양옆 선 제거 가능 여부 검토 *⇒ 검토니까 다음에*
	- [x] 출력물의 가동 개시일과 점검일자 표기 상이하고 점검일자가 나오지 않음  (가동 개시일/점검일자 확인하여 일치화)
	- [x] 점검팀 구성원의 직급이 상이함  (기장, 기사, 매니저 등의 구분이 타팀원으로 표기) ⇒ JOB_NM 으로 바꿨는데 아직 잘 모르겠음
	- [ ] 부적합 건수 취합 테이블 상이
	- [ ] 출력물의 양식 Table에서 박스 양옆 선 제거 가능 여부 검토
	- [x] 결과보고서_\[안전점검명]\_날짜.pdf
- [ ] 승인서
	- [x] 결재의 일자/시간 등이 출력되지 않음
	- [ ] 판정결과 양식이 출력물이 절차와 시스템과 일치하지 않음 (최종판정(가동 승인, 가동~))
	- [ ] 부적합 건수 취합 테이블 상이
	- [x] 미완료 개선항목 출력안됨 오류 수정
	- [ ] 미완료 개선항목과 승인판정결과 순서 바뀜(출력 순서) *⇒ 바꾸면 sub report 이슈 있으니까 다음에 바꾸기*
	- [x] 승인서_\[안전점검명]\_날짜.pdf


##### 5차
**가동전안전점검**

- [x] 요청서 출력 버튼 안보임
- [x] 요청서 대상 구분 기준 승인자 변경
- [ ] 결과보고의 개선항목 담당자 지정 할때 더블클릭 기능 뺴는게 나을거 같음
- [x] 조치결과 출력 버튼 안보임
- [ ] 결재요청 할 떄 점검팀장을 승인자로 넣는 기능


##### 출입자교육이수증 
- [ ] jasper 넣어주신 거 보고 데이터 매핑



##### 메일 발송 테스트 관련 
- [x] 안전점검 메일 로그 삽입 관련 오류 수정
- [x] 메일 발송 배치 테스트
```
UPDATE A1S160000_01
SET sendem = 'ushe@skchemicals.com'
WHERE sendem != 'ushe@skchemicals.com'
```


##### JSA 검색 조건 관련
- 데이터 마이그레이션 과정에서 create_user_id가 일부 user_log_id(user_id를 암호화한 값)로 설정되어있는 현상  
	⇒ GSHE 데이터와 user 정보가 100% 동일하지 않기 때문에 (HR 배치 관련) 검색 안 될 시, create_user_id 업데이트 치기
	```
	UPDATE C1S0103010_01
	SET C1S0103010_01.create_user_id = E3_USER.user_id
	FROM C1S0103010_01
	JOIN E3_USER
	ON C1S0103010_01.create_user_id = E3_USER.USER_LOG_ID
	```            



