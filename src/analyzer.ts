import { Projects } from "./types";
import { generateCsvContent } from "./helpers";

export function analyzeProjects(projects: Projects): string {
  const csv = projects
    .map(generateCsvContent)
    .flat()
    .join("\n");

  return csv;
}
