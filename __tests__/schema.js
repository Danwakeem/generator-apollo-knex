"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-apollo-knex:schema", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/schema"))
      .withPrompts({
        name: "wow",
        apiName: "wow",
        tableName: "wow"
      });
  });

  it("creates files", () => {
    assert.file(["src/schemas/wow/wow.ts", "src/schemas/wow/wow.spec.ts"]);
  });
});
