const loadJson = require("./loadJson.js");

function loadConfigs(file) {
  if (typeof file === "object") return file;
  // // if extension NOT json - > error
  // const ext = file.slice(-4);
  // console.log(ext);
  let confFile = file;
  let confData;
  const defaultFileName = ".cdburc";

  if (!file) confFile = `${process.cwd()}/${defaultFileName}`;

  try {
    // confData = require(confFile);
    confData = loadJson(confFile);
  } catch (e) {
    // console.log(e.message);
    if (process.env.NODE_ENV !== "test") {
      console.log(`Cannot find "${confFile}" file.`);
      console.log(`Defaults will be used.`);
    }

    confData = {
      workDir: process.cwd(),
      outputFolder: "couchdb",
      keepRevs: true,
    };
  }

  return confData;
}

module.exports = loadConfigs;
