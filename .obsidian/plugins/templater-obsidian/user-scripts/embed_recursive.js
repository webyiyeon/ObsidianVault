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
  
      // [[링크]] 또는 ![[링크]] 찾기
      const regex = /!?\[\[([^\]]+)\]\]/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const linked = match[1].split('|')[0]; // [[page|alias]] 형태 대응
        const linkedPath = linked.endsWith('.md') ? linked : linked + '.md';
        const linkedFile = app.vault.getAbstractFileByPath(linkedPath);
        if (linkedFile) {
          const inner = await expandNote(linkedPath);
          // ![[page]] → 내용 포함 / [[page]] → 이름만 표시
          if (match[0].startsWith('!')) {
            result = result.replace(match[0], inner);
          } else {
            result = result.replace(match[0], `**[${linked}](${linkedPath})**`);
          }
        }
      }
      return result;
    }
  
    const current = tp.file.path(true);
    const expanded = await expandNote(current);
  
    // HTML로 변환 (간단히 Markdown → HTML)
    const converter = app.plugins.plugins["markdown-converter"]?.converter;
    let html;
    if (converter) {
      html = await converter.makeHtml(expanded);
    } else {
      html = `<pre>${expanded}</pre>`;
    }
  
    // HTML 파일 저장
    const outFile = current.replace('.md', '_merged.html');
    await app.vault.create(outFile, html);
  
    new Notice(`✅ Exported merged HTML: ${outFile}`);
    return html;
  };
  