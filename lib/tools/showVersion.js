const pkj = require("../../package.json");

function showVersion() {
  // return `Version: @gabtec/couchd-utils:v${pkj.version}`;
  console.log(`Version: @gabtec/couchd-utils:v${pkj.version}`);
}

module.exports = showVersion;
