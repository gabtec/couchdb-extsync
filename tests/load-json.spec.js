const expect = require("chai").expect;
const loadJson = require("../lib/tools/loadJson");

describe("CouchDB Utils - Tools: loadJson() Test Suite", () => {
  it("should correctly load example file", () => {
    const path = process.cwd() + "/tests/example-data/example_json_file.json";
    const result = loadJson(path);
    const expected = {
      workDir: ".",
      outputFolder: "couchdb",
      keepRevs: true,
    };

    expect(result).to.be.eql(expected);
  });

  it("should throw error if file not valid json", () => {
    const path = process.cwd() + "/README.md";

    expect(() => {
      loadJson(path);
    }).to.throw("[Error:] Invalid JSON syntax");
  });
});
