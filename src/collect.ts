import glob from "glob";

import { createFile, filterFilesWithoutComponents } from "./helpers";
import { Projects, Project } from "./types";
import { config } from "./config";

export function collectFilesToAnalyzePerProject(): Projects {
  return config.projects.map((project: Project) => {
    const internalGlobOptions = config.createGlobConfig(
      project.projectAbsolutePath
    );

    const files = glob
      .sync(internalGlobOptions.pattern, internalGlobOptions.options)
      .map(filePath => createFile(filePath, project.projectName))
      .filter(filterFilesWithoutComponents);

    return { ...project, files };
  });
}
