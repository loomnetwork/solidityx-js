var SolidityParser = require("../index.js");

describe("Parser", function() {
  it("parses soliditX examples without throwing an error", function() {
    SolidityParser.parseFile("./test/voting.solx", true);
  });
});

describe("Built Parser", function() {
  it("parses soliditX examples without throwing an error", function() {
    SolidityParser.parseFile("./test/voting.solx", false);
  });
});
