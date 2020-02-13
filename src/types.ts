import { ParserOptions } from "@babel/parser";
import { IOptions } from "glob";

export type Component = string;

export type Components = Component[];

export type File = {
  absolutePath: string;
  project: string;
  components: Components | null;
};

export type Files = File[];

export type Project = {
  projectName: string;
  projectAbsolutePath: string;
  files: Files;
};

export type Projects = Project[];

export type InternalGlobConfig = {
  pattern: string;
  options: Pick<IOptions, "ignore" | "absolute" | "dot" | "cwd">;
};

export type CsvConfig = {
  delimiter: string;
  fileName: string;
  path: string;
};

export type Config = {
  csv: CsvConfig;
  rootFolder: string;
  projectsList: string[];
  projects: Projects;
  babelParserOptions: ParserOptions;
  createGlobConfig(cwd: string): InternalGlobConfig;
};
