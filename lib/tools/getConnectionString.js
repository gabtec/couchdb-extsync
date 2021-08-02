function getConnectionString(file) {
  if (typeof file === "object")
    return `${file.COUCHDB_PROT}://${file.COUCHDB_USER}:${file.COUCHDB_PASS}@${file.COUCHDB_ADDR}:${file.COUCHDB_PORT}`;
  // // if extension NOT json - > error
  // const ext = file.slice(-4);
  // console.log(ext);
  let envFile = file;
  const defaultFileName = ".env";

  if (!file) envFile = `${process.cwd()}/${defaultFileName}`;

  try {
    require("dotenv").config({ path: envFile });
  } catch (e) {
    console.log(e);
    // if (process.env.NODE_ENV !== "test")
    //   console.log(`Cannot find "${envFile}" file. Defaults will be used.`);
  }

  const envData = {
    COUCHDB_PROT: process.env.COUCHDB_PROT || "http",
    COUCHDB_USER: process.env.COUCHDB_USER || "admin",
    COUCHDB_PASS: process.env.COUCHDB_PASS || "admin",
    COUCHDB_ADDR: process.env.COUCHDB_ADDR || "localhost",
    COUCHDB_PORT: process.env.COUCHDB_PORT || "5984",
  };

  return `${envData.COUCHDB_PROT}://${envData.COUCHDB_USER}:${envData.COUCHDB_PASS}@${envData.COUCHDB_ADDR}:${envData.COUCHDB_PORT}`;
}

module.exports = getConnectionString;
