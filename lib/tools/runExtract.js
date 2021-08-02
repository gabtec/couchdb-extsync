const fs = require("fs");
const axios = require("axios");

const parseOptions = require("./parseOptions");
const loadConfigs = require("./loadConfigs");
const getConnectionString = require("./getConnectionString.js");
const log = require("./logger");

/**
 * ----------- lib feature ----------------------
 */
async function runExtract(args) {
  return new Promise(async (resolve, reject) => {
    // let options, configs;
    console.log(`==* CouchDB Utils: Extract *==`);
    console.log(`Mode: extract started...`);

    try {
      const options = parseOptions(args);
      const configs = loadConfigs(options.pathToConfig);
      const connString = getConnectionString(options.pathToEnv);

      // prep output folder
      const folders = `${configs.workDir}/${configs.outputFolder}/${options.database}/`;
      fs.mkdirSync(folders, { recursive: true });

      // GET CouchDB Design Docs
      const endpoint = `${connString}/${options.database}/_design_docs?include_docs=true`;
      const result = await axios.get(endpoint);

      // SAVE to file
      result.data.rows.forEach((row) => {
        const ddocName = row.id.slice(8);
        const filename = `_design_${ddocName}_v${row.doc._rev.slice(
          0,
          1
        )}.json`;

        const path = `${folders}${filename}`;
        fs.writeFileSync(path, JSON.stringify(row.doc));
        log(`[SUCCESS:] Design Doc "${filename}" saved to file!`);
        return resolve({ extract: "ok" });
      });
    } catch (error) {
      console.log(`[Error:] ${error.message}`);
      return reject(error);
    }
  });
}

module.exports = runExtract;
