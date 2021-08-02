const expect = require("chai").expect;
const exec = require("child_process").exec;

describe("CouchDB Utils - Tools: log() Test Suite", () => {
  it("should output message in dev mode", (done) => {
    const runner = `export NODE_ENV=dev && node ${process.cwd()}/tests/logger-runner.js`;

    exec(runner, (err, stdout) => {
      expect(stdout).to.include("testing logger");
      done();
    });
  });

  it("should output message in prod mode", (done) => {
    const runner = `export NODE_ENV=prod && node ${process.cwd()}/tests/logger-runner.js`;

    exec(runner, (err, stdout) => {
      expect(stdout).to.include("testing logger");
      done();
    });
  });

  it("should not output message in test mode", (done) => {
    const runner = `export NODE_ENV=test && node ${process.cwd()}/tests/logger-runner.js`;

    exec(runner, (err, stdout) => {
      expect(stdout).to.include("");
      done();
    });
  });
});
