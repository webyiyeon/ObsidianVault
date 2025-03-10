<%
const image_path = "/kakao_capture.png";  // OCR로 분석할 카톡 캡처 이미지

const python_code = `
import re
import json
import easyocr

# Obsidian 파일 경로 설정
OBSIDIAN_FILE_PATH = "path/to/Obsidian/finance.md"
JSON_FILE_PATH = "path/to/Obsidian/finance_data.json"

def extract_text_from_image(image_path):
    """OCR로 카톡 캡처 이미지에서 텍스트 추출"""
    reader = easyocr.Reader(['ko', 'en'])
    result = reader.readtext(image_path, detail=0)
    return "\\n".join(result)

def extract_payment_info(text):
    """카톡 메시지에서 납부 날짜와 금액을 정규식으로 추출"""
    date_pattern = re.search(r"(\\d{2})월(\\d{2})일", text)
    amount_pattern = re.search(r"(\\d{1,3}(?:,\\d{3})*)원", text)

    if not date_pattern or not amount_pattern:
        return None, None

    month = date_pattern.group(1)
    amount = int(amount_pattern.group(1).replace(",", ""))  # 숫자 변환

    return month, amount

def update_monthly_summary(month, amount):
    """월별 지출 내역 JSON에 업데이트"""
    try:
        with open(JSON_FILE_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        data = {}

    # 월별 합계 업데이트
    data[month] = data.get(month, 0) + amount

    with open(JSON_FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    return data

def save_to_obsidian(data):
    """월별 예상 납부액을 Obsidian 마크다운 파일로 저장"""
    md_content = "# 월별 예상 지출\\n\\n"
    for month, total in sorted(data.items()):
        md_content += f"- {month}월: {total:,}원\\n"

    with open(OBSIDIAN_FILE_PATH, "w", encoding="utf-8") as f:
        f.write(md_content)

def process_kakao_image(image_path):
    """카톡 캡처 이미지 분석 후 Obsidian 업데이트"""
    text = extract_text_from_image(image_path)
    
    month, amount = extract_payment_info(text)
    if not month or not amount:
        return "❌ 데이터 추출 실패"

    updated_data = update_monthly_summary(month, amount)
    save_to_obsidian(updated_data)

    return f"✅ {month}월 예상 납부액: {amount:,}원\\n📌 Obsidian 파일 업데이트 완료!"

# 실행
image_path = "` + image_path + `"
result = process_kakao_image(image_path)
print(result)
`;

tp.system.exec_command("python -c \"" + python_code + "\"")
%>


