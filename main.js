#!/usr/bin/env node

/* eslint no-console: 0 */


var argv = require("yargs").argv;
var SolidityXParser = require("./index.js");
var SolidityXCompiler = require("./compiler.js");
var fs = require("fs");
var path = require("path");

var result;
var outputFile = "";
var originalSrc = "";
try {

  if (argv.e) {
    result = SolidityXParser.parse(argv.e || argv.expression);
    originalSrc = argv.e || argv.expression
  } else {
  	var filePath = argv.f || argv.file || argv._[0]
  	originalSrc = fs.readFileSync(path.resolve(filePath), {encoding: "utf8"})
    result = SolidityXParser.parse(originalSrc);
    outputFile = argv._[1] || argv.outputfile
  }
  SolidityXCompiler.compileToSolidityToFile(originalSrc, result, outputFile)

} catch (e) {
  console.error(e.message)
  process.exit(1);
}
