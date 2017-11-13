var fs = require("fs");
var path = require("path");

module.exports = {
  compileToSolidityToFile: function(originalSrc, astResult, outputFile) {
	  var data = this.compileToSolidity(astResult)
	  if(outputFile == null ||  outputFile =='') {
	  	//ouput to stdout, 
	  	return console.log(data)
	  }
	  var fs = require('fs');
	  fs.writeFile(path.resolve(outputFile), data, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	  }); 
	},
	compileToSolidity: function(result) {
		return JSON.stringify(result, null, 2);
	}
};
