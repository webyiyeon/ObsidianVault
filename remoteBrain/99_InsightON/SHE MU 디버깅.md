
## 작업안전분석(JSA) 목록

##### 결재 로직 문제로 오류 
1. 관련 DB Table
	- com_appr_rqst / com_appr_rqst_line 
	- saf_jsa / saf_jsa_appr 
2. saf_jsa / saf_jsa_appr 은 같이 생성되고, 생태계를 같이 함 
	따라서, saf_jsa 의 appr_rqst_no 만 관리하는 것이 아니라 saf_jsa_appr 의 appr_rqst_no를 함께 관리해줘야함 
	**업체 작성중** 상태로 돌리기 위한 쿼리 
		``` 
		update saf_jsa_appr 
		set appr_rqst_no = null, com_biz_appr_step_cd = null, complete_yn = 'N', complete_dt = null, appr_user_id = null, appr_user_nm = null
		where saf_jsa_id = #{safJsaId}		;
		
		update saf_jsa
		set appr_rqst_no = null, appr_step = 'SA-JA-01', last_appr_step = null
		where saf_jsa_id = #{safJsaId}
		```

3. p_appr_rqst_no 쪽 유념해서 관리할 것
4. front 단의 update docstate 쪽 관리도 안되고 있어서 이 부분은 closePopup(refTempPopup) 으로 해결한 상황 


##### Jenkins 빌드 구성 'Delete workspace before build starts' 추가 시 Logon failed 및 OOM 오류 발생
1. Delete 설정 없을 경우 변경점만 pull 해서 괜찮았으나, 
   설정 후 clone으로 바뀌면서 차지하는 메모리 량이 높았던 것으로 추정. 
2. 다른 빌드 대기가 없을 때(12:30 ~ 13:00 / 17:40 ~ 18:00) 빌드 실행할 것.




## 협력사 보안 점검

#### XSS / CSRF 공격 가능성
게시판 사용자 입력값 검증이 부재하여 Stored XSS 공격이 가능합니다. 이를 통해 공격자가 악성 URL을 제작/배포한 스크립트를 실행시켜 악성코드 유포, 피싱, 계정 탈취 등에 사용할 수 있습니다. 모든 파라미터 값에 검증 필터링을 일괄 적용하여 조치하시기 권고 드립니다.

1. isLink, isButton 등 E3 Framework 단에서 Wijimo makeLink 모듈을 사용할 때 스크립트가 실행되는 이슈 
2. Backend 쪽에서 White List 작성하여 Jsoup 모듈 Safelist 활용 
3. DB 삽입 시에는 '<', '>' 문자열만 replace해서 저장하고, 
   DB에서 호출단 쪽(Response)에 Safelist로 clean 처리
4. Safelist에 적용할 White List에는 Board(게시판)에서 필요한 태그들 남겨둠
   이 때, color 쪽이 정상 적용되지 않는 오류 있음 (span, style속성을 addAttributes 할 시 오류 발생)
5. response 자체적으로 clean되어 나오는 데이터로 스크립트로 판단되는 데이터는 잘라서 출력


#### 입력 값 크기 및 무결성 검증 오류
입력 값 크기 오류 메시지가 자세하게 노출되어 개발환경 등 공격자에게 유용한 정보가 노출되고 있습니다. 이 정보는 2차 공격을 위한 정보로 이용될 가능성이 있습니다. 입력 값 크기를 검증하여 오류 메시지가 노출되지 않도록 조치를 권고드립니다.

1. 생년월일 정규식 검증 추가


#### 검색엔진 정보 노출 가능성
robots.txt 파일이 존재하지 않습니다. 이 경우, 검색 엔진 기능에 의해 웹 서비스 공격에 필요한 정보(시스템, 개인정보 등)가 검색되어 해킹의 빌미를 제공할 수 있습니다. robots.txt 파일은 웹사이트 검색 로봇이 접근하는 것을 방지하기 위한 국제규약으로, 접근 제한에 대한 설명을 robots.txt에 기술할 것을 권고 드립니다.

1. src/main/resources/public 쪽에 robots.txt 파일 추가


#### 인증(세션 및 토크)값 안전성 설정 여부
인증값은 로그인 시 마다 새롭게 발급하고, 로그아웃 및 브라우저 종료 시마다 만료처리하여 재사용이 불가능하도록 조치 권고드립니다.

1. localStorage 저장 로직을 sessionStorage 저장으로 전역 변경


#### 오류 페이지를 통한 정보 노출 여부
예외처리 오류 메시지가 응답값에 노출되어 개발환경 등 공격자에게 유용한 정보가 노출되고 있습니다. 이 정보는 2차 공격을 위한 정보로 이용 될 가능성이 있습니다. 모든 에러 발생 시, 별도의 에러 페이지를 생성하고 해당 에러 페이지로 이동 가능하도록 설정하고 정보 노출을 최소화 하실 것을 권고 드립니다.
에러 응답 시 HTTP 응답 코드, 페이지가 동일하여 공격자가 응답으로부터 어떠한 정보도 얻을 수 없도록 조치가필요합니다.
(필수 조치 에러 코드: 400, 401, 403, 404, 405, 500)

1. IIS (인터넷 정보 서비스) 관리자 > 오류 페이지 > /error.html
2. 에러 페이지용 파일 추가 


#### 서버 헤더 정보 노출
응답 헤더를 통해 서버 정보가 노출되고 있습니다. 노출된 정보를 통해 2차 공격에 악용될 가능성이 존재합니다. HTTP 응답 헤더의 Server 항목에 소프트웨어 종류 및 버전이 나타나지 않도록 조치 권고 드립니다.

1. IIS (인터넷 정보 서비스) 관리자 > URL 재작성 > 아웃바운드 규칙 추가 
2. ![[Pasted image 20250624095303.png]]
3. ![[Pasted image 20250624095551.png]]


#### 취약한 버전의 네트워크 보안 프로토콜 사용 여부
현재 TLS 1.0, 1.1이 활성화 되어 있습니다. 해당 버전은 권장하지 않는 암호화 알고리즘 및 키 교환 알고리즘을 사용하고 있습니다. 이로 인한 취약성을 제거하기 위하여 TLS 1.0, 1.1 비활성화를 권고 드립니다.

[# Windows Server disable TLS 1.0 TLS 1.1 (비활성화)](https://xinet.kr/?p=3402 "https://xinet.kr/?p=3402")

