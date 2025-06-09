const fs = require("fs");
const path = require("path");

function findImports(dir, results = new Set()) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findImports(filePath, results);
    } else if (filePath.endsWith(".js") || filePath.endsWith(".ts") || filePath.endsWith(".jsx") || filePath.endsWith(".tsx")) {
      const content = fs.readFileSync(filePath, "utf-8");
      const importRegex = /from ['"]([^\.\/][^'"]*)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        results.add(match[1]);
      }
    }
  }
  return results;
}

const imports = findImports(path.join(__dirname, "src"));
console.log([...imports].sort().join("\n"));