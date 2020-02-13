import fs from "fs";

import { config } from "./config";
import { analyzeProjects } from "./analyzer";
import { getFilesToAnalyzePerProject } from "./helpers";

Promise.resolve()
  .then(getFilesToAnalyzePerProject)
  .then(analyzeProjects)
  .then(csvContent => fs.writeFileSync(config.csv.path, csvContent));
