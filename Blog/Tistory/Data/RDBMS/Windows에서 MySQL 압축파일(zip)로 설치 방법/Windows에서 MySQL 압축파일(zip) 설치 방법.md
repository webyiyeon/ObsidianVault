# [Windows] MySQL zip install

[[Windows] MySQL 압축파일(zip) 설치 방법](https://sensol2.tistory.com/71)

## MySQL 압축파일(zip) 설치 방법

- MySQL은 보다 간편한 설치를 위해 자체 설치 파일인 msi 파일을 제공하고 있지만, 프로그램보다는 커맨드라인으로 작성하는 것이 편한 입장에서 오히려 관리하기 보다 어려움을 느꼈다. 그래서 zip 파일을 이용해 설치하는 법을 간단히 정리해본다. 참고 링크는 [공식 홈페이지](https://dev.mysql.com/downloads/windows/installer/5.7.html)와 [센솔님의 블로그](https://sensol2.tistory.com/71)이다.
- 개인 컴퓨터는 mac을 사용하고 있지만 현재 회사에서는 Windows를 사용하고 있어 관련 방법을 숙지하고 있어야 했고, 기존 회사에서 사용하던 DB는 MySQL 5.6.x 버전이라 ngram 풀텍스트 인덱스를 활용하는데 제한이 있어 로컬로 테스트 해볼 겸 5.7.x 버전을 설치해보기로 했다.

### MySQL 다운로드

MySQL 공식 다운로드 페이지에서 **DOWNLOADS → MySQL Community Downloads → MySQL Community Server → 버전 선택, zip 파일 다운로드** 해준다.
![[231227_1.png]]
![[Untitled (7).png]]
![[Untitled (8).png]]

현재 글 작성일(2023년 12월 27일)에는 기존의 참고 블로그나 링크 캡쳐들과 웹사이트의 디자인이 조금 바뀌면서 혼돈이 올 수 있을 것 같아 화면 캡쳐 이미지를 첨부했다.

![[Untitled (9).png]]
![[Untitled.png]]

여기서 받고자 하는 버전, 사용하는 OS(Windows)를 설정하고 zip 파일을 받는다.

### MySQL 설치

이제부터 간단한 커맨드를 통해 mysql 버전을 설치해보자.

다운로드 받은 파일(zip)을 적당한 위치에 압축 해제해주고, 경로를 기억해두자.
![[Untitled (1).png]]
![[스크린샷 2023-12-27 085552.png]]
```bash
C:\\mysql-5.7.44-winx64
```

cmd를 관리자 권한으로 실행한다. Windows 시작에서 `cmd`라고 검색하면 명령 프롬프트가 뜨는데, 이 때 우클릭하여 관리자 권한으로 실행한다.
![[Untitled (2).png]]


cmd에서 MySQL 경로로 이동한다. 아까 기억해둔(복사해둔) 경로 앞에 ‘cd’를 붙이면 해당 경로로 이동하기라는 뜻이다.
```bash
cd C:\\mysql-5.7.44-winx64
```
```bash
cd [MySQL 설치 경로]
```


MySQL 설치와 설정 파일이 들어가있는 `bin`이라는 폴더에 들어가야 한다. 역시 `cd`를 이용하여 해당 경로로 이동한다.
![[Untitled (3).png]]
```bash
cd bin
```


이제는 설치 파일을 실행하는 단계이다.
아래 커맨드를 입력해 MySQL을 초기화 시켜준다.
```bash
mysqld --initialize
```


![[Untitled (4).png]]
작성 후 정상 작동 되었다면 `data`라는 폴더가 생성된 것을 확인할 수 있다.


<aside> 
💡 혹시 위 커맨드가 정상작동되지 않을 경우 파워쉘(powershell)로 작성하고 있는게 아닌지 확인하자.
</aside>


아래 커맨드를 입력하여 MySQL 설치해준다.
```bash
mysqld --install
```

설치가 잘 되었다면, 설치에 성공했다는 메시지가 출력된다.
이제 아래 커맨드를 입력하여 설치된 MySQL을 실행시켜 MySQL 서비스를 시작 상태로 바꿔준다.
```bash
net start mysql
```
![[Untitled (5).png]]


### MySQL 접속

설치가 잘 되었고, 서비스 시작 단계까지 잘 왔다면 아래 커맨드를 입력해 MySQL에 접속할 수 있다.
```bash
mysql -u root -p
```
위 커맨드는 root user로 password를 입력하여 접속하겠다는 뜻이다. 입력하면, 비밀번호를 입력하라고 한다.
이 때, 우리가 별도의 비밀번호를 설정하지 않았다는 것을 기억할 것이다! 비밀번호는 좀전에 초기화(initialize)단계에서 생성된 `data` 폴더 아래의 `현재 컴퓨터이름.err`라는 파일 안에 있다.
![[Untitled (13).png]]
![[Untitled (14).png]]
`[Note] A temporary password is generated ~` 끝에 임시 비밀번호가 있다.

해당 비밀번호를 cmd 창에 입력해주면 된다.

위 비밀번호는 임시이기 때문에, MySQL shell 접속에 성공했다면 쿼리문을 통해 비밀번호를 바꿔줘야 한다.
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '새 비밀번호';
```
이 때, 비밀번호를 문자열로 인식하기 때문에 숫자만 있더라도 `‘`따옴표를 꼭 입력해줘야 한다.

MySQL shell에서 빠져나오고 싶다면 간단히 아래 커맨드를 입력하면 된다.
```sql
exit
```

그리고 다시 들어가고 싶을 때는, 위에서와 같이 비밀번호를 입력해 ‘root’라는 user로 접속하겠다는 커맨드를 입력한다.
```sql
mysql -u root -p
```

비밀번호는 변경된 `새 비밀번호`를 입력한다. (당연히 이 때는 따옴표 없이 문자열만 입력해준다.)
![[Untitled (15).png]]

👍 이제 MySQL 설치와 기본적인 설정을 완료했다! 쿼리도 공부하고, DB 스키마도 짜보고 이런저런 장난을 시작해보자.