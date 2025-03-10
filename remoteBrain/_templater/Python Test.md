<%
const image_path = app.vault.adapter.getBasePath() + "/kakao_capture.png";
const result = tp.system.exec_command(`python /finance_script.py "${image_path}"`);
result
%>
