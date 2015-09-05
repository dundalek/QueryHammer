var fs = require('fs');
var SparqlParser = require('sparqljs').Parser;
var parser = new SparqlParser();

var query = fs.readFileSync('./sample-query.sparql', 'utf-8');

var parsedQuery = parser.parse(query);

fs.writeFileSync('sample-query.json', JSON.stringify(parsedQuery, null, '  ') + '\n');
