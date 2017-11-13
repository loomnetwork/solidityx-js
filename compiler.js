var fs = require("fs");
var path = require("path");

module.exports = {
  compileToSolidityToFile: function(originalSrc, astResult, outputFile) {
	  var data = this.compileToSolidity(astResult, originalSrc)
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

	compileToSolidity: function(ast, originalSrc) {
		//Compiler is really stupid right now
		//it replaces lines in the origin source file
		//later one we will have a more stringent compiler
		//this is for prototyping
		
		//let newAst = transformer(ast);
		let output = this.codeGenerator(ast, originalSrc);

		console.log(JSON.stringify(ast, null, 2));
		return output
	},

	codeGenerator: function(node, originalSrc) {
		var outputData = "";

		if(node instanceof Array) {
			console.log("looping array")
			out = ""
			for (let item of node) {
				console.log("array item-" + item)
				out = out + this.codeGenerator(item, originalSrc)
			}
			return out
		}
		if(node == undefined) {
			console.log("undefined-" + node)
			return 
		}

		console.log("node-" + node.type + ' start-' + node.start + ' end-' + node.end)

		switch (node.type) {

			case 'PragmaXStatement':
			  return (
			  	'// pragmax solidityX ' + node.start_version.operator + node.start_version.version + '\n'
			  );				

			case 'FunctionDeclaration' :
				//TODO for now we wont traverse FunctionDeclaration
		      	return 	originalSrc.slice(node.start, node.end) + '\n'		
			case 'BlockStatement' :
				//TODO for now we wont traverse blockstatements
		      	return 	originalSrc.slice(node.start, node.end) + '\n'		
			case 'ContractStatement':
			  return (
			  	'contract ' + node.name + ' { \n' +
			    this.codeGenerator(node.body, originalSrc) +
			    '\n } \n'
			  );

			case 'Program':
			  return (
			    this.codeGenerator(node.body, originalSrc) +
			    '\n //Generated with SolidityX compiler, http://solidityx.org for more information' 
			  );
		    // And if we haven't recognized the node, we'll throw an error.
		    default:
		      console.log("unknown type- " + node.type + " start-" + node.start )
		      var ret = originalSrc.slice(node.start, node.end) + '\n'

		      if(node.body != undefined) {
		      	return ret + this.codeGenerator(node.body, originalSrc)
		      } 
		      return ret
		      //throw new TypeError(node.type);
		}

		output = originalSrc
		return outputData
	}
};
