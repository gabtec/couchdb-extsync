const expect = require("chai").expect;
const loadConfigs = require("../lib/tools/loadConfigs");
const fs = require("fs");

const cdburc = {
  workDir: ".",
  outputFolder: "couchdb",
  keepRevs: true,
};

const testRcFile = {
  workDir: `${process.cwd()}/.cdburc`,
  outputFolder: "couchdbrc",
  keepRevs: true,
};

const testCustomFile = {
  workDir: `${process.cwd()}/couchdb-utils-tests-conf.json`,
  outputFolder: "couchdbcustom",
  keepRevs: true,
};

// delete .cdburc to avoid test interference
before(() => {
  if (fs.existsSync(`${process.cwd()}/.cdburc`)) {
    fs.unlinkSync(`${process.cwd()}/.cdburc`);
  }
});

after(() => {
  // console.log(testRcFile.workDir);
  fs.writeFileSync(`${process.cwd()}/.cdburc`, JSON.stringify(cdburc));
});

describe("CouchDB Utils - Tools: loadConfigs() Test Suite", () => {
  // C1
  context("Ctx: using default values", () => {
    it("should load default values if no -C arg and no .cdburc file", () => {
      const result = loadConfigs();
      const expected = {
        workDir: process.cwd(),
        outputFolder: "couchdb",
        keepRevs: true,
      };

      expect(result).to.be.eql(expected);
    });
  });

  // C2
  context("Ctx: using .cdburc file", () => {
    before(() => {
      // console.log(testRcFile.workDir);
      fs.writeFileSync(testRcFile.workDir, JSON.stringify(testRcFile));
    });

    after(() => {
      // delete require.cache[require.resolve(testRcFile.workDir)];
      fs.unlinkSync(testRcFile.workDir);
    });

    it("should load from .cdburc.json file if no -C arg", () => {
      const result = loadConfigs();

      expect(result).to.be.eql(testRcFile);
    });
  });

  // C3
  context("Ctx: using user config file", () => {
    before(() => {
      fs.writeFileSync(testCustomFile.workDir, JSON.stringify(testCustomFile));
    });

    after(() => {
      // delete require.cache[require.resolve(testRcFile.workDir)];
      fs.unlinkSync(testCustomFile.workDir);
    });

    it("should load from arg -C file", () => {
      const result = loadConfigs(testCustomFile.workDir);

      expect(result).to.be.eql(testCustomFile);
    });
  });

  // C4
  context("Ctx: using a JSON file with bad syntax", () => {
    before(() => {
      // this file has last line ending comma, and will fail jSON syntax
      fs.writeFileSync(testCustomFile.workDir, cdburc.toString());
    });

    after(() => {
      // delete require.cache[require.resolve(testRcFile.workDir)];
      fs.unlinkSync(testCustomFile.workDir);
    });

    it("should exit with error", () => {
      expect(() => {
        loadConfigs(testCustomFile.workDir);
      }).to.throw("[Error:] Invalid JSON syntax.");
    });
  });

  // C4
  context("Ctx: using object data", () => {
    it("should load from arg -C data object", () => {
      const result = loadConfigs(cdburc);

      expect(result).to.be.eql(cdburc);
    });
  });
});
