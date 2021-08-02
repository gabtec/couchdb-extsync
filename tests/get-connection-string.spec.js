const expect = require("chai").expect;
const fs = require("fs");
const getConnectionString = require("../lib/tools/getConnectionString.js");

const localDotEnvPath = `${process.cwd()}/.env`;
const localDotEnv = `
  COUCHDB_PROT=http
  COUCHDB_USER=admin
  COUCHDB_PASS=admin
  COUCHDB_ADDR=localdotenv
  COUCHDB_PORT=5984
`;

const customDotEnvPath = `${process.cwd()}/.myenv`;
const customDotEnv = `
COUCHDB_PROT=http
COUCHDB_USER=admin
COUCHDB_PASS=admin
COUCHDB_ADDR=customdotenv
COUCHDB_PORT=5984
`;

const envObj = {
  COUCHDB_PROT: "http",
  COUCHDB_USER: "admin",
  COUCHDB_PASS: "admin",
  COUCHDB_ADDR: "customdotenv",
  COUCHDB_PORT: 5984,
};

function clearProcessEnvCouchVars() {
  delete process.env.COUCHDB_PROT;
  delete process.env.COUCHDB_USER;
  delete process.env.COUCHDB_PASS;
  delete process.env.COUCHDB_ADDR;
  delete process.env.COUCHDB_PORT;
}

describe("CouchDB Utils - Tools: getConnectionString() Test Suite", () => {
  // C1
  context("Ctx: using default values", () => {
    it("should load default values if no -E arg and no .env file", () => {
      const result = getConnectionString();
      const expected = "http://admin:admin@localhost:5984";

      expect(result).to.be.eql(expected);
    });
  });

  // C2
  context("Ctx: using .env file", () => {
    before(() => {
      fs.writeFileSync(localDotEnvPath, localDotEnv);
    });

    after(() => {
      // clear process.env
      clearProcessEnvCouchVars();
      // delete file
      fs.unlinkSync(localDotEnvPath);
    });

    it("should load from .env file if no -E arg", () => {
      const result = getConnectionString();
      const expected = "http://admin:admin@localdotenv:5984";

      expect(result).to.be.eql(expected);
    });
  });

  // C3
  context("Ctx: using user custom env file", () => {
    before(() => {
      fs.writeFileSync(customDotEnvPath, customDotEnv);
    });

    after(() => {
      // clear process.env
      clearProcessEnvCouchVars();
      // delete file
      fs.unlinkSync(customDotEnvPath);
    });

    it("should load from -E arg", () => {
      const result = getConnectionString(customDotEnvPath);
      const expected = "http://admin:admin@customdotenv:5984";

      expect(result).to.be.eql(expected);
    });
  });

  // C3
  context("Ctx: using object data", () => {
    it("should load from arg -E data object", () => {
      const result = getConnectionString(envObj);
      const expected = "http://admin:admin@customdotenv:5984";

      expect(result).to.be.eql(expected);
    });
  });
});
