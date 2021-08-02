const axios = require("axios");
const expect = require("chai").expect;
const MockAdapter = require("axios-mock-adapter");
const exec = require("child_process").exec;
const fs = require("fs");

const example = require("./example-data/example_data_for_GET_ddocs.json");

const loadJson = require("../lib/tools/loadJson.js");
const runExtract = require("../lib/tools/runExtract");

const cmd = "node lib/cli.js";

describe("CouchDB Utils - runExtract() Test Suite", () => {
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
    let mock;
    after(() => {
      // mock.reset();
      mock.restore();
    });

    it("should create the output folder", async () => {
      mock = new MockAdapter(axios);
      mock
        .onGet(
          "http://admin:admin@localhost:5984/teste_db/_design_docs?include_docs=true",
          {
            asymmetricMatch: function (actual) {
              return {};
            },
          }
        )
        .reply(function (config) {
          return [200, example];
        });

      await runExtract(["-e", "-d", "teste_db"]);

      // assert folder was created
      const srcFolder = `${process.cwd()}/couchdb/teste_db`;

      const allFiles = fs.readdirSync(srcFolder, (err, files) => {
        if (err) {
          console.log(`[Error]: ${err.message}`);
          process.exit(1);
        }
        return files;
      });

      expect(allFiles).to.be.eql([
        "_design_testeOne_v1.json",
        "_design_testeTwo_v4.json",
      ]);

      const a = loadJson(`${srcFolder}/${allFiles[0]}`);
      expect(a).to.be.eql(example.rows[0].doc);
    });
  });
});
