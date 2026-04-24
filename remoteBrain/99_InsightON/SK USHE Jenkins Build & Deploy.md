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