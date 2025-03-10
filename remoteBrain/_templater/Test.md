```python
const output_path = "/python_output.md";  // 결과 저장 경로
const python_code = `
import random
random_number = random.randint(1, 100)
with open("` + output_path + `", "w", encoding="utf-8") as f:
    f.write(f"🎲 랜덤 숫자: {random_number}\\n")
`;

tp.system.exec_command("python -c \"" + python_code + "\"")
const result = app.vault.adapter.read(output_path);  // 저장된 결과 읽기
```


