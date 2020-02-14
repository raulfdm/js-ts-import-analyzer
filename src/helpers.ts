import { parse } from "@babel/parser";
import { Statement, ImportSpecifier, ImportDeclaration } from "@babel/types";
import fs from "fs";
import glob from "glob";

import { Project, Projects, File, Components } from "./types";
import { config } from "./config";

function filterLegoImports(statement: Statement) {
  return (
    statement.type === "ImportDeclaration" &&
    statement.source.value === "@blendle/lego"
  );
}

function getFileContent(filePath: string): string {
  return fs.readFileSync(filePath).toString();
}

function getComponentsUsed(filePath: string): Components | null {
  const fileContent = getFileContent(filePath);

  const astTree = parse(fileContent, config.babelParserOptions);

  const components = astTree.program.body
    .filter(filterLegoImports)
    .map(node => (node as ImportDeclaration).specifiers)
    .flat()
    .map(specifier => (specifier as ImportSpecifier).imported.name);

  return components.length > 0 ? components : null;
}

export function filterFilesWithoutComponents(file: File): boolean {
  return !!file.components;
}

export function createProject(projectName: string): Project {
  return {
    projectAbsolutePath: `${config.rootFolder}${projectName}/`,
    projectName,
    files: []
  };
}

export function createFile(fileAbslutePath: string, projectName: string): File {
  return {
    absolutePath: fileAbslutePath,
    project: projectName,
    components: getComponentsUsed(fileAbslutePath)
  };
}
