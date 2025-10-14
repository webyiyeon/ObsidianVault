// embed_recursive.js (Templater 2.x 완전 대응)
module.exports = async function (tp) {
  // Obsidian 전역 app 접근 (현재 버전에서 유효)
  const app = window?.app;
  const vault = app?.vault;

  if (!vault) {
    new Notice("❌ Obsidian app.vault 객체 접근 실패");
    console.error("vault undefined:", { tp, windowApp: window?.app });
    return "";
  }

  const processed = new Set();

  async function expand(path) {
    if (processed.has(path)) return "";
    processed.add(path);

    const file = vault.getAbstractFileByPath(path);
    if (!file) return "";

    const content = await vault.read(file);
    const regex = /!?\[\[([^\]]+)\]\]/g;
    let result = content;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const name = match[1].split("|")[0];
      const target = name.endsWith(".md") ? name : name + ".md";
      const linkedFile = vault.getAbstractFileByPath(target);
      if (linkedFile) {
        const inner = await expand(target);
        result = result.replace(match[0], inner);
      }
    }
    return result;
  }

  try {
    const current = tp.file.path(true);
    const merged = await expand(current);
    const outPath = current.replace(/\.md$/, "_merged.md");

    const existing = vault.getAbstractFileByPath(outPath);
    if (existing) {
      await vault.modify(existing, merged);
    } else {
      await vault.create(outPath, merged);
    }

    new Notice(`✅ 병합 완료:\n${outPath}`);
  } catch (err) {
    new Notice("❌ embed_recursive 실행 중 오류 ("+err+")");
  }
};
