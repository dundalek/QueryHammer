
var fs = require('fs');
var PEG = require("pegjs");

var ebnfGrammar = fs.readFileSync('../node_modules/grammkit/lib/parse-ebnf.pegjs', 'utf-8');
var sparqlGrammar = fs.readFileSync('../node_modules/grammkit/examples/sparql-1.1.ebnf', 'utf-8');

var parser = PEG.buildParser(ebnfGrammar);

fs.writeFileSync('sparql.json', JSON.stringify(parser.parse(sparqlGrammar)));
