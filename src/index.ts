import fs from "fs";
import PrettyError from "pretty-error";

import { config } from "./config";
import { analyzeProjects } from "./analyzer";
import { collectFilesToAnalyzePerProject } from "./collect";

console.time("Time");
console.log("Generating report...");

Promise.resolve()
  .then(collectFilesToAnalyzePerProject)
  .then(analyzeProjects)
  .then(csvContent => fs.writeFileSync(config.csv.path, csvContent))
  .then(function() {
    console.log("Report generated sucessfully");
    console.timeEnd("Time");
  })
  .catch(e => {
    const pe = new PrettyError();
    console.log(pe.render(e));
  });
