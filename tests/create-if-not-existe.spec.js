const axios = require("axios");
const expect = require("chai").expect;

const createIfNotExistent = require("../lib/tools/createIfNotExistent.js");

const url = "http://admin:admin@localhost:5984";

describe("CouchDB Utils - Tools: createIfNotExistent() Test Suite", () => {
  // C1
  context("When DB exists", () => {
    const db = "to_delete_db";

    before(async () => {
      const endpoint = `${url}/${db}`;
      await axios.put(endpoint);
    });

    after(async () => {
      const endpoint = `${url}/${db}`;
      await axios.delete(endpoint);
    });

    it("should output ok: db exists", async () => {
      const result = await createIfNotExistent(
        "http://admin:admin@localhost:5984",
        db
      );

      expect(result).to.be.eql({ ok: `DB "${db}" exists.`, error: null });
    });
  });
  //C2
  context("When DB does NOT exists", () => {
    const db = "to_create_db";

    after(async () => {
      const endpoint = `${url}/${db}`;
      await axios.delete(endpoint);
    });

    it("should output ok: db created", async () => {
      const result = await createIfNotExistent(
        "http://admin:admin@localhost:5984",
        db
      );

      expect(result).to.be.eql({ ok: `DB "${db}" created.`, error: null });
    });
  });

  //C3
  context("When other error happens", () => {
    const db = null;

    it("should output ok:false, error: error", async () => {
      try {
        // force an error with NO dbname
        const result = await createIfNotExistent(
          "http://admin:admin@localhost:5984",
          db
        );
      } catch (error) {
        expect(error.ok).to.be.eql(false);
        expect(error.error.message).to.be.eql("Invalid params");
      }
    });
  });
});
