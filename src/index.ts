import fs from "fs";

import { config } from "./config";
import { analyzeProjects } from "./analyzer";
import { collectFilesToAnalyzePerProject } from "./collect";

Promise.resolve()
  .then(collectFilesToAnalyzePerProject)
  .then(analyzeProjects)
  .then(csvContent => fs.writeFileSync(config.csv.path, csvContent));
