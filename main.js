#!/usr/bin/env node

/* eslint no-console: 0 */


var argv = require("yargs").argv;
var SolidityXParser = require("./index.js");
var SolidityXCompiler = require("./compiler.js");

var result;
var outputFile = "";
var originalSrc = "";
try {

  if (argv.e) {
    result = SolidityXParser.parse(argv.e || argv.expression);

  } else {
    result = SolidityXParser.parseFile(argv.f || argv.file || argv._[0]);
    outputFile = argv._[1]
  }
  SolidityXCompiler.compileToSolidityToFile(originalSrc, result, outputFile)

} catch (e) {
  console.error(e.message)
  process.exit(1);
}
