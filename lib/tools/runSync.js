const fs = require("fs");
const axios = require("axios");

const createIfNotExistent = require("./createIfNotExistent.js");
const getConnectionString = require("./getConnectionString.js");
const loadConfigs = require("./loadConfigs.js");
const loadJson = require("./loadJson.js");
const log = require("./logger.js");
const parseOptions = require("./parseOptions.js");

/**
 * ----------- Helpers ----------------------
 */
function loadFilesContent(files, folder) {
  const content = [];
  files.forEach((file) => {
    const fullPath = `${folder}${file}`;
    const part = loadJson(fullPath);
    content.push(part);
  });
  return content;
}

/**
 * ----------- lib feature ----------------------
 */
async function runSync(args) {
  return new Promise(async (resolve, reject) => {
    console.log(`==* CouchDB Utils: Sync *==`);
    console.log(`Mode: sync started...`);

    let options, configs, connString;

    try {
      options = parseOptions(args);
      configs = loadConfigs(options.pathToConfig);
      connString = getConnectionString(options.pathToEnv);

      // - GET design docs from files
      const newName = options.rename || options.database;
      const destDb = `${connString}/${newName}`;
      const srcFolder = `${configs.workDir}/${configs.outputFolder}/${options.database}/`;

      // --- GET files content
      const files = fs.readdirSync(srcFolder);
      const content = loadFilesContent(files, srcFolder);

      await createIfNotExistent(connString, newName);

      // PUT design docs to remote database
      const endpoint = `${destDb}/_bulk_docs`;
      const data = {
        docs: content,
        new_edits: !configs.keepRevs,
      };

      await axios.post(endpoint, data);

      log(
        `[SUCCESS]: "${options.database}" sync successfully finished to "${options.rename}"`
      );
      return resolve({ sync: "ok" });
    } catch (error) {
      console.log(error.message);
      return reject(error);
    }
  });
}

module.exports = runSync;

// try {
//   // Cenario 1: db dest exists
//   // -------------------------
//   const ask = await axios.head(destDb);
//   if (ask.status)
//     log(`Database "${newName}" exists. Starting sync process...`);

//   const saved = await saveOnDB(destDb, content, configs);

//   if (saved.success) {
//     log(
//       `[SUCCESS]: "${options.database}" sync successfully finished to "${options.rename}"`
//     );
//   }
// } catch (error) {
//   // Cenario 2: db dest do NOT exists
//   // --------------------------------
//   if (error.response.status !== 404) {
//     console.log(`[Error]: ${error.message}`);
//   } else {
//     console.log(`Database "${newName}" not found. Lets create one...`);
//     try {
//       console.log(`${destDb} will be created`);
//       await axios.put(destDb, {});
//       console.log(`${destDb} created`);
//       await saveOnDB(destDb, content, configs);
//       log(
//         `[SUCCESS]: "${options.database}" sync successfully finished to "${options.rename}"`
//       );
//     } catch (e) {
//       console.log("final catch");
//       console.log(e);
//     }
//   }
// }
