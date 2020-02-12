const parser = require("@babel/parser");
const fs = require("fs");
const glob = require("glob");

const projects = ["/Users/raul/projects/blendle/blendle-web-client/"];

const foo = projects.map(projectPath => {
  const globPattern = `${projectPath}/**/*.js`;
  const ignoreList = ["build", "node_modules", "cache", "gulp"].map(
    i => `${projectPath}${i}/**/*`
  );
  return glob.sync(globPattern, { ignore: ignoreList });
});

fs.writeFileSync("files.json", JSON.stringify(foo));

// const path =
//   "/Users/raul/projects/blendle/blendle-web-client/src/js/app/components/dialogues/ShareToEmail.js";

// const fileContent = fs.readFileSync(path).toString();

// const result = parser.parse(fileContent, {
//   allowImportExportEverywhere: true,
//   plugins: ["jsx", "typescript", "classProperties"]
// });

// function getBlendleLegoImport(bodyElement) {
//   return (
//     bodyElement.type === "ImportDeclaration" &&
//     bodyElement.source.value === "@blendle/lego"
//   );
// }

// function getImportedComponents(legoImportNode) {
//   return legoImportNode
//     .map(e => e.specifiers)
//     .flat()
//     .map(specifier => specifier.imported.name);
// }

// const legoImport = result.program.body.filter(getBlendleLegoImport);
// const componentesUsed = getImportedComponents(legoImport);

// const componentsUsedWithFilePath = componentesUsed.map(c => `${path},${c}`);
