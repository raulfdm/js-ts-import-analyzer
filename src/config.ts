import path from "path";

import { Config } from "./types";
import { createProject } from "./helpers";

/* TODO: Get some options from .env? */
export const config: Config = {
  rootFolder: "/Users/raul/projects/blendle/",
  csv: {
    delimiter: ";",
    fileName: "report",
    get path() {
      return path.resolve(__dirname, "../report", `${this.fileName}.csv`);
    }
  },
  projectsList: ["blendle-web-client", "web-payment", "web-landings"],
  get projects() {
    return this.projectsList.map(createProject);
  },
  babelParserOptions: {
    allowImportExportEverywhere: true,
    // @ts-ignore
    plugins: [
      "jsx",
      "typescript",
      "classProperties",
      "decorators-legacy",
      "decoratorsBeforeExport"
    ]
  },
  createGlobConfig(cwd: string) {
    const foldersToIgnore = [
      "build",
      "node_modules",
      "cache",
      "gulp",
      "vendor",
      "webpack",
      "__mocks__",
      "tests",
      "__functional-tests__",
      "__e2e__",
      ".next"
    ];

    return {
      /* Do not get specs/tests and get any ts, tsx, js file */
      pattern: `**/!(*.spec|*.test).{ts,tsx,js}`,
      options: {
        /* Ignore a bunch of useless files/folders */
        ignore: foldersToIgnore.map(i => `${i}/**/*`),
        /* Returns absolute path */
        absolute: true,
        /* Considers hidden files/folders */
        dot: true,
        cwd
      }
    };
  }
};
