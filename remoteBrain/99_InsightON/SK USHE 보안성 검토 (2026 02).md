## 서버 헤더정보 노출

### 기본 설정으로 숨기기 (Apache는 두고 버전 정보만 숨김 처리)

아마존 리눅스의 Apache 기본 설정 파일 경로: `/etc/httpd/conf/httpd.conf`

설정 파일

```
sudo nano /etc/httpd/conf/httpd.conf
sudo vi /etc/httpd/conf/httpd.conf
```

파일 끝에 추가 또는 수정

- **`ServerTokens`**: 서버가 보낼 정보의 양을 조절합니다. `Prod`로 설정하면 "Apache"라고만 나옵니다.
- **`ServerSignature`**: 에러 페이지 하단에 서버 정보를 표시할지 여부를 결정합니다.

```
# 서버 헤더에 소프트웨어 이름만 출력 (예: Server: Apache)
ServerTokens Prod

# 에러 페이지 하단에서 서버 버전 정보 제거
ServerSignature Off
```

설정을 바꾼 후에는 반드시 서비스를 재시작해야 적용

```
# 문법 체크
sudo httpd -t

# 재시작
sudo systemctl restart httpd

# 확인
curl -I localhost
```

문법 체크는 `Syntax OK`나오면 성공
출력 결과 중 `Server: Apache` (버전 번호 없음) 만 나오는지 확인

### mod_security를 이용해 헤더 숨기기

mod_security 설치

```
# Amazon Linux 2 / AL2023
sudo dnf install mod_security
# 또는
sudo yum install mod_security
```

설치 후 설정 파일을 열어 `ServerTokens`를 무시하고 헤더를 덮어쓰도록 설정

- **파일 열기:** `sudo nano /etc/httpd/conf.d/mod_security.conf` (또는 `/etc/httpd/conf/httpd.conf`)
- **내용 수정:** 파일 안에 `SecServerSignature` 항목을 찾아 아래와 같이 수정하거나 추가

```
# 기존 설정을 끄고 보안 엔진 활성화
SecRuleEngine On

# Server 헤더 내용을 빈 값이나 원하는 이름으로 변경
SecServerSignature " "
```

빈값(`" "`)으로 설정하면 `Server:` 헤더 자체가 비어 보이게 되고, `"Unknown"` 등으로 적으면 해당 텍스트가 출력됨.

적용 및 확인

```
# 문법 체크
sudo httpd -t

# 재시작
sudo systemctl restart httpd

# 확인
curl -I localhost
```

## TinyMCE 버전 숨기기

게시판의 Editor 역할을 하는 Library 중 TinyMCE
`BoardEditor.jsx` 파일에서 아래 위치 확인 및 수정

```
import { Editor } from '@tinymce/tinymce-react';

function BoardEditor() {
  return (
    <Editor
      // ...기존에 작성된 apiKey 등의 설정들
      init={{
        height: 500,
        menubar: true,
        plugins: [ 'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview' ],
        toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright',

        // --- 여기서부터가 버전/브랜딩 숨기기 설정 ---
        branding: false,   // 하단 'Powered by Tiny' 제거
        promotion: false,  // 우측 상단 'Upgrade' 버튼 제거
        help_accessibility: false, // (선택) 도움말 관련 안내 제거
        // ---------------------------------------
      }}
    />
  );
}
```

⇒ 그러나 잘 안되었음
그래서 `plugins`에서 `help` 항목 주석 처리, `toolbar`에서도 `help` 항목 주석 처리 진행
