// embed_embeds_only.js
module.exports = async function (tp) {
  const app = window?.app;
  const vault = app?.vault;

  if (!vault) {
    new Notice("❌ vault 객체를 찾을 수 없습니다.");
    return "";
  }

  const currentPath = tp.file.path(true);
  const file = vault.getAbstractFileByPath(currentPath);
  if (!file) {
    new Notice("❌ 현재 파일을 찾을 수 없습니다.");
    return "";
  }

  const content = await vault.read(file);
  const regex = /!\[\[([^\]]+)\]\]/g;
  let merged = content;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const name = match[1].split("|")[0];
    const target = name.endsWith(".md") ? name : name + ".md";
    const linkedFile = vault.getAbstractFileByPath(target);

    if (linkedFile) {
      const inner = await vault.read(linkedFile);
      merged = merged.replace(match[0], inner);
    } else {
      merged = merged.replace(match[0], `(⚠️ 파일 ${name}을(를) 찾을 수 없습니다)`);
    }
  }

  try {
    const outPath = currentPath.replace(/\.md$/, "_embedsOnly.md");
    const existing = vault.getAbstractFileByPath(outPath);
    if (existing) {
      await vault.modify(existing, merged);
    } else {
      await vault.create(outPath, merged);
    }
    new Notice(`✅ embed된 페이지만 포함된 병합 완료:\n${outPath}`);
  } catch (err) {
    new Notice("❌ embed_embeds_only 실행 중 오류 (콘솔 확인"+err+").");
  }
};
