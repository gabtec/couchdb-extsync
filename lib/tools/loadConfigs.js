const loadJson = require("./loadJson.js");
const log = require("./logger.js");

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
    if (e.message.includes("Invalid JSON syntax")) {
      throw e;
    } else {
      log(`Cannot find "${confFile}" file.`);
      log(`Defaults will be used.`);
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
