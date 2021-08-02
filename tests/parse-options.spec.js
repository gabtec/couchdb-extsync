const expect = require("chai").expect;
const parseOptions = require("../lib/tools/parseOptions");

describe("CouchDB Utils - Tools: parseOptions() Test Suite", () => {
  it("should consider database arg as required", () => {
    expect(() => {
      parseOptions(["mode", "-r", "some_renamed_db"]);
    }).to.throw("A database name is required");
  });

  it("should parse database name when -d option", () => {
    const result = parseOptions(["mode", "-d", "some_db"]);
    const expected = {
      database: "some_db",
      rename: undefined,
      pathToEnv: undefined,
      pathToConfig: undefined,
    };

    expect(result).to.be.eql(expected);
  });

  it("should parse database name when database option", () => {
    const result = parseOptions(["mode", "database", "some_db"]);
    const expected = {
      database: "some_db",
      rename: undefined,
      pathToEnv: undefined,
      pathToConfig: undefined,
    };

    expect(result).to.be.eql(expected);
  });

  it("should parse rename when -r option", () => {
    const result = parseOptions([
      "mode",
      "-d",
      "some_db",
      "-r",
      "some_renamed_db",
    ]);
    const expected = {
      database: "some_db",
      rename: "some_renamed_db",
      pathToEnv: undefined,
      pathToConfig: undefined,
    };

    expect(result).to.be.eql(expected);
  });

  it("should parse rename when rename option", () => {
    const result = parseOptions([
      "mode",
      "-d",
      "some_db",
      "rename",
      "some_renamed_db",
    ]);
    const expected = {
      database: "some_db",
      rename: "some_renamed_db",
      pathToEnv: undefined,
      pathToConfig: undefined,
    };

    expect(result).to.be.eql(expected);
  });

  it("should parse rename when -r option in any order", () => {
    const result = parseOptions([
      "mode",
      "-r",
      "some_renamed_db",
      "-d",
      "some_db",
    ]);
    const expected = {
      database: "some_db",
      rename: "some_renamed_db",
      pathToEnv: undefined,
      pathToConfig: undefined,
    };

    expect(result).to.be.eql(expected);
  });

  it("should throw error if -d arg has no value", () => {
    expect(() => {
      parseOptions(["mode", "-d", "-r", "some_renamed_db"]);
    }).to.throw('"-r" is invalid database name');
  });

  it("should throw error if database arg has no value", () => {
    expect(() => {
      parseOptions(["mode", "database", "-r", "some_renamed_db"]);
    }).to.throw('"-r" is invalid database name');
  });

  it("should throw error if -d arg has no value in any order", () => {
    expect(() => {
      parseOptions(["mode", "-r", "some_renamed_db", "-d"]);
    }).to.throw("A database name is required");
  });

  it("should throw error if database arg has no value in any order", () => {
    expect(() => {
      parseOptions(["mode", "-r", "some_renamed_db", "database"]);
    }).to.throw("A database name is required");
  });

  it("should throw error if -r arg has invalid value in any order", () => {
    expect(() => {
      parseOptions(["mode", "-d", "some_db", "-r", "-E"]);
    }).to.throw('"-E" is an invalid new database name');
  });

  it("should throw error if -E arg has invalid value in any order", () => {
    expect(() => {
      const r = parseOptions(["mode", "-d", "some_db", "-E", "rename"]);
      console.log(r);
    }).to.throw('"rename" is invalid path to env file');
  });

  it("should throw error if -C arg has invalid value in any order", () => {
    expect(() => {
      parseOptions(["mode", "-d", "some_db", "-C", "-E"]);
    }).to.throw('"-E" is invalid path to config file');
  });

  it("should parse happy path", () => {
    const result = parseOptions([
      "mode",
      "-d",
      "some_db",
      "-r",
      "some_new_db",
      "-E",
      "/path/to/env",
      "-C",
      "/path/to/config",
    ]);
    const expected = {
      database: "some_db",
      rename: "some_new_db",
      pathToEnv: "/path/to/env",
      pathToConfig: "/path/to/config",
    };

    expect(result).to.be.eql(expected);
  });

  it("should parse happy path in new order", () => {
    const result = parseOptions([
      "mode",
      "-d",
      "some_db",
      "-C",
      "/path/to/config",
      "-E",
      "/path/to/env",
      "-r",
      "some_new_db",
    ]);
    const expected = {
      database: "some_db",
      rename: "some_new_db",
      pathToEnv: "/path/to/env",
      pathToConfig: "/path/to/config",
    };

    expect(result).to.be.eql(expected);
  });

  it("should ignore empty -C -E -r", () => {
    // TODO vai dar erro mais tarde
  });
});
