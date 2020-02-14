import { Projects, Project } from "./types";
// import {} from "./helpers";
import { config } from "./config";

export function generateCsvContent(project: Project): string[] {
  const { delimiter } = config.csv;
  return project.files
    .map(file => {
      return file.components!.map(componentName => {
        return `${file.absolutePath
          .replace(config.rootFolder, "")
          .replace(
            project.projectName,
            ""
          )}${delimiter}${componentName}${delimiter}${
          project.projectName
        }`.replace("/src", "src");
      });
    })
    .flat();
}

export function analyzeProjects(projects: Projects): string {
  const csv = projects
    .map(generateCsvContent)
    .flat()
    .join("\n");

  return csv;
}
