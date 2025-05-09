
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