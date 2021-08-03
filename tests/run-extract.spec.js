const axios = require("axios");
const expect = require("chai").expect;
const MockAdapter = require("axios-mock-adapter");
const exec = require("child_process").exec;
const fs = require("fs");

const example = require("./example-data/example_data_for_GET_ddocs.json");

const loadJson = require("../lib/tools/loadJson.js");
const runExtract = require("../lib/tools/runExtract");
const getConnectionString = require("../lib/tools/getConnectionString");
const cdbu = require("../lib/index");

const url = getConnectionString();

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
  context("Ctx: no db", () => {
    let mock;
    const db = "no_db";

    after(() => {
      // mock.reset();
      mock.restore();
    });

    it("should not create the output folder when no ddocs", async () => {
      mock = new MockAdapter(axios);
      mock
        .onGet(`${url}/${db}/_design_docs?include_docs=true`, {
          asymmetricMatch: function (actual) {
            return {};
          },
        })
        .reply(function (config) {
          // DB not found
          return [404, {}];
        });

      try {
        await runExtract(["-e", "-d", db]);
      } catch (error) {
        expect(error.message).to.include("Request failed with status code 404");
      }

      try {
        const srcFolder = `${process.cwd()}/couchdb/${db}`;
        fs.readdirSync(srcFolder, (err, files) => {
          console.log(err);
        });
      } catch (error) {
        expect(error.message).to.include("no such file or directory");
      }
    });
  });

  // C3
  context("Ctx: no design docs in db", () => {
    let mock;
    const db = "empty_db";

    // before(async () => {
    //   await createIfNotExistent(url, db);
    // });
    after(async () => {
      // mock.reset();
      mock.restore();

      // await axios.delete(`${url}/${db}`);

      // // TODO remove ddocs on db OR remove db
      // const folder = `${process.cwd()}/couchdb/${db}`;
      // fs.rmdirSync(folder, { recursive: true });
    });

    it("should not create the output folder when no ddocs", async () => {
      mock = new MockAdapter(axios);
      mock
        .onGet(`${url}/${db}/_design_docs?include_docs=true`, {
          asymmetricMatch: function (actual) {
            return {};
          },
        })
        .reply(function (config) {
          // DB not found
          return [
            200,
            {
              total_rows: 0,
              offset: 0,
              rows: [],
            },
          ];
        });

      const result = await runExtract(["-e", "-d", db]);
      expect(result.info).to.be.eql(
        `[Info]: Database "${db}" has no design docs.`
      );

      try {
        const srcFolder = `${process.cwd()}/couchdb/${db}`;
        fs.readdirSync(srcFolder, (err, files) => {
          console.log(`[Error]: ${err.message}`);
        });
      } catch (error) {
        expect(error.message).to.include("no such file or directory");
      }
    });
  });

  // C4
  context("Ctx: outputs", () => {
    const db = "to_extract_db";
    let mock;

    before(async () => {
      // TODO put ddocs on db
      await cdbu.runSync(["-s", "-d", "teste_db", "-r", db]);
    });
    after(async () => {
      // mock.reset();
      mock.restore();

      await axios.delete(`${url}/${db}`);

      // TODO remove ddocs on db OR remove db
      const folder = `${process.cwd()}/couchdb/${db}`;
      fs.rmdirSync(folder, { recursive: true });
    });

    it("should create the output folder", async () => {
      mock = new MockAdapter(axios);
      mock
        .onGet(`${url}/${db}/_design_docs?include_docs=true`, {
          asymmetricMatch: function (actual) {
            return {};
          },
        })
        .reply(function (config) {
          return [200, example];
        });

      await runExtract(["-e", "-d", db]);

      // assert folder was created
      const srcFolder = `${process.cwd()}/couchdb/${db}`;

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
