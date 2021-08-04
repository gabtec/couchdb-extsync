const expect = require("chai").expect;
const axios = require("axios");
const exec = require("child_process").exec;

const example = require("./example-data/example_data_for_GET_ddocs.json");
const clearEnvs = require("./helpers/clearEnvs.js");
const getConnectionString = require("../lib/tools/getConnectionString");
const runSync = require("../lib/tools/runSync");

const cmd = "node lib/cli.js";
const url = getConnectionString();

// async function loadData(dbName) {
//   const res = await axios.get(
//     `http://admin:admin@localhost:5984/${dbName}/_design_docs?include_docs=true`
//   );
//   expect(res.data).to.be.eql(example);
// }
after(() => {
  clearEnvs();
});

describe("CouchDB Utils - runSync() Test Suite", () => {
  // C1
  context("Ctx: arg validation", () => {
    it("should exit if no database arg", (done) => {
      exec(cmd.concat(" -s"), (err, stdout) => {
        expect(stdout).to.include("A database name is required");
        done();
      });
    });
  });

  // C2
  context("Ctx: outputs", () => {
    const dbName = "runsync_teste_db";

    after(async () => {
      const endpoint = `${url}/${dbName}`;
      await axios.delete(endpoint);
    });

    it("should save to localhost test db server", async () => {
      const conf = {
        workDir: `${process.cwd()}/tests/example-data`,
        outputFolder: "couchdb",
        keepRevs: true,
      };

      try {
        const r = await runSync([
          "-s",
          "-d",
          "teste_db",
          "-r",
          dbName,
          "-C",
          conf,
        ]);

        // console.log("runSync res");
        // console.log(r);

        const res = await axios.get(
          `${url}/${dbName}/_design_docs?include_docs=true`
        );
        // console.log("GET res");
        // console.log(res.status);
        expect(res.data).to.be.eql(example);
      } catch (e) {
        // console.log("in test catch");
        console.log(e);
      }
    });
  });
});
