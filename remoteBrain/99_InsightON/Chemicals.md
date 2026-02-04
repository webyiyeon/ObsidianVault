
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
	- [x] HR Interface
	- [ ] 작업허가서 기준정보 변경 (중국 기준만)
	- [x] AWS / Linux / MSSQL 환경 세팅
	- [x] Jasper 번역
	- [x] 모바일 Teams In App 설정 (siteCd, langCd)

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


##### ugac 로그 
A1S1406000_01


##### 오픈
11/4 완료 필
- [x] 작업허가 승인 완료 시  '연장작업' 기능 보완(@김경례)
	설비포탈 I/F 통해서 작성된 작업허가에 대해 복사 안됨 ( she시스템에서 등록된 작업허가는 정상 동작)
- [x] 안전점검 미리보기(이미지 파일) (김종현/ICT(일반)/SKCHEM,김경례/ICT(일반)/SKCHEM)
- [x] JSA 엑셀파일 업로드 (박이연/ICT(협력)/SKCHEM)
- [x] HR 배치 시 권한그룹 초기화 확인 ⇒ 김종현 책임 확인 (20:00~)
- [x] 설비포탈 -> she i/f 관련 보완(@김유진)

11/5 완료 필
- [x] 설비포탈 I/F 시 JSA 데이터 자동 입력 (김경례/ICT(일반)/SKCHEM
- [ ] 기존시스템 참조 (내 등록만 검색, 이미지 참조) (김종현/ICT(일반)/SKCHEM)
- [x] 교육-출입자교육-출입교육대상자 : 이수증 출력 (박이연/ICT(협력)/SKCHEM)


11/6
- [x] 결재관련 개선(박이연)
- [x] JSA 파일업로드 개선(박이연)
- [x] 첨부파일 다운로드 확인(박이연)
- [x] 작업허가서 조치사항 출력 확인(체크사항)(박이연)



##### JSA / 안전작업실시계획서 오류 사항 시 대처

**JSA >**
* 저장/결재 등 버튼이 안보인다고 하는 경우  
	1.해당 계정이 공사주관부서인지 생산부서인지 확인

	= 공사주관부서 일 떄 : 해당 JSA DB 조회 후 appr_step 이 "SA_JA_03" 인지 확인  
	  "SA_JA_03" 일 경우 : C1S0103010_03 테이블에서 saf_jsa_id로 검색 후   
               SA-JA-01에 결재 번호 없으면 JSA 테이블에서 해당 appr_step을  
              "SA-JA-01"로 변경

	= 생산주관부서 일 떄 : 해당 JSA DB 조회 후 appr_step 이 "SA_JA_03" 인지 확인  
	  "SA_JA_03" 일 경우 : C1S0103010_03 테이블에서 saf_jsa_id로 검색 후  
              SA-JA-02에 결재 번호 없으면 JSA 테이블에서 해당 appr_step을  
              "SA-JA-02"로 변경  
          그대로이면  JSA 테이블에서 해당 appr_rqst_no에 값이 있는지 확인

* 작업허가작성 시 JSA 탭에서 조회가 안된다고 하는 경우  
	1. 해당 JSA 만료일이 있는지 확인  
	2. JSA 승인이 완료되었는지 확인

* JSA 재작성 요청 시 Object.toString() null 오류 발생 시  
	1. 해당 JSA의 협력업체 정보 조회 후 대표자 이메일 등 이메일이 있는지 확인


**안전작업실시계획서 >**

* 버튼이 안 보인다고 하는 경우  
	1. 해당 계정이 신청부서 담당자에 있는데 없다고 하는 경우 = 동명이인인지 확인필요


##### 배포 후 전체적으로 안되는 사항 리스트 

| **안전작업환경실시계획서** | 안전환경작업실시계획서 제출 및 저장이 안됨                                     |
| --------------- | ----------------------------------------------------------- |
|                 | 안전작업실시계획 결재 완료 후 출력 시 이상한 출력물 나옴                            |
|                 | 협력업체 포탈에서 안전작업실시계획서 작성 후 "저장" 클릭 시 발생 오류                    |
|                 | 작업실시계획서 저장을 누르니 에러 발생                                       |
|                 | 담당자가 결재해야하는 안전환경작업실시계획서가 있음에도, 나의 결재현황에서 보이지 않음 (협력사-> 담당자) |
|                 | 안전환경작업실시계획서 결재가 모두 완료되었는데, [결재요청, 회수, 반려] 버튼이 살아 있음         |
|                 | 재작성 요청 시 내용 적는 칸이 없음                                        |
|                 | 결재 완료 시 우측상단 "결재요청, 회수, 반려" 버튼이 삭제되도록 수정                    |
|                 | 검토 내용: 신청부서, 안전환경팀 의견 작성해도 공란으로 보임                          |
|                 | 사전제출서류 다운로드 시 오류로 출력이 안됨                                    |

| **교육** | 신규 시스템 출입자 교육 이수증 출력 시, 기존 시스템과 출력물이 다름. 파일이 열리지 않음      |
| ------ | -------------------------------------------------------- |
|        | 출력물의 a4 양식, 사이즈 등은 모두 기존 시스템과 동일하게 설정.                   |
|        | 협력업체 포탈 "교육-부서별 대상자선정" 신규 등록 시 교육일시 직접지정 날짜 선택 불가        |
|        | "교육-부서별 대상자선정" 출력 시 "서약서"만 출력됩니다. "교육 이수증"의 출력이 필요함.     |
|        | "출입자교육 > 출입교육대상자 이수증 출력" 오류, 자사 시스템에서 이수증 출력 후 파일 열리지 않음 |
|        | 이수증 출력이 잘됐다 안됐다 함                                        |
|        | 협력업체 포탈에서 본인 업체 외 다른 업체의 교육 신청 정보도 모두 조회가 가능             |
|        | 출력된 이수증 QR코드 찍어도 출입관리시스템에서 인식 안됨                         |

| **환경통합법**       | DMT/BPO 분리가 되야함 (하나의 계정에서  권한 분리를 통한 관리가 필요)                |
|---|---|
|                 | JSA 양식 일괄 업로드 기능에 대한 체크                                     |
|                 | 환경-환경통합법-운영일지-[배출구, 배출시설, 대기방지시설]의 분류 수정 필요                 |
|                 | 구 SHE 시스템 분류와 동일하게 요청(BON생산팀은 삭제)                           |


##### 업무 분장 

|                                                                                                                                    | 우선순위   | 담당      | 완료여부 | 비고                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ---- | ------------------------------------------------------------ |
| **JSA**                                                                                                                            |        |         |      |                                                              |
| ==3. 작업안전분석목록에서 JSA 조회 시, 협력사의 검색조건이 "완전 동일"로 설정되어 있음==                                                                            | ==높음== | ==박이연== | 완료   |                                                              |
| ==4. 작업안전분석목록 JSA 작성 시 작업단계 목록 "엑셀 업로드 기능 사용 오류"==                                                                                 | ==높음== | ==박이연== |      |                                                              |
| ==3. 작업안전분석목록 JSA 수급인(협력업체) 검토 결과 작성 불가 (입력칸이 아에없음)==                                                                              | ==중간== | ==박이연== | 완료   |                                                              |
| 안전작업실시계획서                                                                                                                          |        |         |      |                                                              |
| 1. 안전환경작업실시계획서 사전제출서류 "공사업체이외 공사전 서명자료" 필수값 지정 (모두사인 활용)                                                                           | 높음     | 김종현     |      |                                                              |
| 2. 안전환경작업실시계획서 사전제출서류 "공사도급계약서 또는 공사발주서" 필수값 지정                                                                                    | 높음     | 김종현     |      |                                                              |
| 1. 안전환경작업실시계획서 결재 완료 시 우측 상단 "결재요청, 회수, 반려" 버튼 삭제되도록 수정 (협력사 포함)                                                                   | 중간     | 김종현     |      |                                                              |
| 2. 안전환경작업실시계획서 사전제출서류 "약도" 첨부해도 없어짐                                                                                                | 중간     | 김종현     |      |                                                              |
| 1. 안전환경작업실시계획서 내 "검토 내용 : 신청부서, 안전환경팀 의견" 작성해도 공란으로 보임                                                                             | 낮음     | 김종현     |      |                                                              |
| 2. 안전환경작업실시계획서 사전제출서류 다운로드 시 첨부된 모든 문서 한 번에 다온로드됨 (PDF 병합됨)                                                                        | 낮음     | 김종현     |      |                                                              |
| **작업허가서**                                                                                                                          |        |         |      |                                                              |
| 1. 작업허가서(작업현황)과 R프레도 연계 [매일 아침 작업현황 공유 메일]                                                                                         | 매우높음   | 김유진     |      |                                                              |
| 6. 작업허가서 안전환경팀 검토의견이 기준정보와 다르게 일괄 같은 내용으로 삽입됨                                                                                      | 높음     | 김유진     |      |                                                              |
| 7. 작업허가서에서 체크한 "안전조치사항"이 초기화 되는 현상 다수 발생                                                                                           | 높음     | 김유진     |      |                                                              |
| 8. 작업허가서에서 작업위치가 초기화되는 현상 (결재단계마다)                                                                                                 | 높음     | 김유진     |      |                                                              |
| **설비포털**                                                                                                                           |        |         |      |                                                              |
| **환경통합법**                                                                                                                          |        |         |      |                                                              |
| 11. 환경분야 `환경>환경통합법>운영일지 작성`의 배출구, 배출시설, 대기방지시설의 분류 수정 필요 <br> (이전 시스템과 동일하게)                                                       | 높음     |         |      |                                                              |
| **출입자교육**                                                                                                                          |        |         |      |                                                              |
| 2. 출입자 교육 이수증 QR코드 인식 불가능                                                                                                          | 매우높음   |         |      |                                                              |
| ==9. 출입자 교육 이수증 PDF파일이 열리지 않음 (정말 가끔까다가 열림)==                                                                                      | ==높음== | ==박이연== |      |                                                              |
| **협력사**                                                                                                                            |        |         |      |                                                              |
| ==협력업체 정보 상세보기 하단 담당자 부분에 사용자 추가 그리드 추가 후 <br> 해당 담당자마다 파일 업로드 기능 및 문서 다운로드 기능==                                                   | ==높음== | ==박이연== |      | ==법적 문제로 ~11/12==                                            |
| ==5. 협력사에서 JSA를 제출한 뒤, 담당자의 "재작성 요청"을 받지 않은 상태에서도 자체적으로 수정할 수 있음 <br> (결재 진행 중에도 내용 수정 시 반영됨)==                                    | ==높음== | ==박이연== |      | ==작업개요나 JSA 작업단계는 수정 불가능하나, <br> 평가자의 검색 버튼이 살아있어서 담당자 변경됨== |
| ==10. 협력사 시스템 출입자 교육 명단 조회 오류 <br> (본인 협력사 외에도 다른 협력사의 교육 신청 내용을 조회할 수 있음, 또는 전혀 보이지 않음)==                                         | ==높음== | ==박이연== |      |                                                              |
| **공통**                                                                                                                             |        |         |      |                                                              |
| 3. 오류 메시지의 출력 개선 <br>(필수값을 기입하지 않거나, 입력 값을 잘못 넣었을 때 영어로된 긴 오류문의 출력되고 있음 <br>→ 정확한 현상을 오류 메시지로 출력한다면 현업 사용자들의 오류 신고 문의가 해소될 것으로 예상) | 매우높음   |         |      |                                                              |
| 결재 요청 시 메일 발송(2단계 → 3단계 과정에서도 되도록 추가)                                                                                              |        | 박이연     |      |                                                              |
| **편의**                                                                                                                             |        |         |      |                                                              |
| 3. (편의 관련사항, 현장 의견) 작업허가 발행 시 신청부서의 담당자 변경 기능 필요                                                                                   | 낮음     |         |      |                                                              |
| 4. (편의 관련사항, 현장 의견) 작업허가서 내 "안전보호구 및 주요 필요 장구"의 추가 <br>[내산앞치마, 내산토시, 방열앞치마, 방열토시]                                                  | 낮음     |         |      |                                                              |
| **데이터 변경 요청**                                                                                                                      |        | 김종현     |      |                                                              |



##### 작업허가서 sequence
구she 에서 이관 시, 4000개 정도만 그대로 이관 가능
4천개 정도의 갭이므로, 그 이후에는 새 seq 부여 필요 


##### SHA512 
자릿수 보기
LoginService
VendorService


##### UGAC 
AuthGrpService.java 에 있는 getInitUgac로 API 전송 (추가만 함 변경 X)


##### 출입자 교육 관련 
- [x] 협력업체 출입자 교육 신청 시, 담당자에게 메일 알림 발송
- [x] 공사주관 부서 검색 시 'SHE'로  SHE팀(울산) 검색 안됨 (공통)
- [x] 공사 Area의 '기타' ⇒ '기타(직접입력)' 변경
- [x] 최초 신규등록 시, 제출 / 저장 버튼 2개로 변경
- [x] 담당자 확인 단계에서 '확인' ⇒ '승인' 으로 문구 변경
- [x] 타 협력업체 정보 조회 불가하도록 수정


##### 사고관리 
- [x] 중간보고 → 최종보고 로 문구 수정
- [x] 출력물에 \[최초, 최종, 완료] 인지 구분할 수 있도록 양식 수정 (ex. 안전사고조사보고서(최초))
- [ ] 상해사고보고서 
	- [x] 다운로드, 열람 불가 (이미지 파일 관련)
	- [ ] 소속부서, 사고등급/유형, 사고원인 및 대책이 빈칸으로 출력 
- [x] 안전사고조사보고서 우측 상단 결재란 수정
	- [x] 안전환경팀장 → SHE팀 (==이름 자동 작성되지 않도록 수정==)
	- [x] 작성 → 검토 → 부서장 → 본부장 으로 변경 (현재 매니저 → 매니저 → 팀장 → 공장장)
	- [x] 안전환경팀의견 → SHE팀 의견으로 문구 수정
	- [x] (6) 조사일시 및 조사참여자가 작성된 것처럼 기입되지 않음 (부서명 누락, 중복 기입)
- [x] 최초작성임에도 '사고경과'에 이전에 작성했던 내역 남아있음
- [x] 공정사고
	- [x] 분류 수정: (1) 위험물질 노출 (2) 화재/폭발 (3) 설비고장 (4) U/T 사고 (5) 생산손실 사고
	- [x] 사고원인에 '심리원인' 삭제
- [x] 사고조사일시 및 조사참여자 추가 시, 구성원 직급은 HR의 G3, G2 등 정보 가져올 수 있도록 수정
	- [x] 현재 직급 공란인 경우도 있음 (새로 기입 불가)
	- [x] 협력사는 직접 작성 가능
	- [x] 협력사 추가 후 SK 케미컬 구성원 추가 시 성명 누락되는 오류 발생
- [x] 사업장 사내사고에서 결재가 완료된 사내사고 열람 시,
	- [x] 사고조사일시 및 조사참여 정보 모두 누락
	- [x] 비상조치 내용 및 평가 정보 누락
- [x] 사고 등급이 다르게 표시되는 오류 (C급인데 A급으로 표시)
