// embed_recursive.js
module.exports = async function (tp) {
    const app = tp.app;
    const processed = new Set();
  
    async function expandNote(path) {
      if (processed.has(path)) return '';
      processed.add(path);
  
      const file = app.vault.getAbstractFileByPath(path);
      if (!file) return '';
  
      const content = await app.vault.read(file);
      let result = content;
  
      // [[링크]] 또는 ![[링크]] 탐색
      const regex = /!?\[\[([^\]]+)\]\]/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const linked = match[1].split('|')[0]; // [[page|alias]] → page만 추출
        const linkedPath = linked.endsWith('.md') ? linked : linked + '.md';
        const linkedFile = app.vault.getAbstractFileByPath(linkedPath);
  
        if (linkedFile) {
          const inner = await expandNote(linkedPath);
          if (match[0].startsWith('!')) {
            // ![[page]] → 내용 포함
            result = result.replace(match[0], inner);
          } else {
            // [[page]] → 단순 링크 표시
            result = result.replace(match[0], `**[${linked}](${linkedPath})**`);
          }
        }
      }
      return result;
    }
  
    try {
      const current = tp.file.path(true);
      const expanded = await expandNote(current);
  
      // Markdown을 HTML로 변환 (기본 MarkdownConverter 플러그인 사용)
      let html;
      try {
        const converter = app.plugins.plugins["markdown-converter"]?.converter;
        if (converter) {
          html = await converter.makeHtml(expanded);
        } else {
          html = `<pre>${expanded}</pre>`;
        }
      } catch (err) {
        console.warn("HTML 변환 실패:", err);
        html = `<pre>${expanded}</pre>`;
      }
  
      // HTML 파일로 저장
      const outFile = current.replace(/\.md$/, "_merged.html");
      await app.vault.create(outFile, html);
  
      new Notice(`✅ Exported merged HTML:\n${outFile}`);
      return html;
    } catch (err) {
      console.error("embed_recursive 오류:", err);
      new Notice("❌ embed_recursive 실행 중 오류 발생. 콘솔을 확인하세요.");
      return "";
    }
  };
  