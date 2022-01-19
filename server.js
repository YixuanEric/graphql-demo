const http = require('http');
const fs = require('fs');
const util = require('./util.js');

const { Resolver } = require('./resolver.js');
const { graphql, buildSchema } = require('graphql');

// define server port either to environment-variable port number or 8000;
const serverPort = process.env.PORT || 8000;

// read the Schema from schema.graphql file
const schemaRawString = fs.readFileSync('schema.gql').toString();

// create GraphQL Schema Object with buildSchema function
const schema = buildSchema(schemaRawString);

// Create a local nodejs server object
const server = http.createServer(async (request, response) => {

    // listening to the requests with URL path '/'
    if (request.url == '/') {
        // GET => not handling GET for this demo, return Hello World
        if (request.method == 'GET') {
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('Hello World');
        }


        // POST => Parse the request body and let GraphQL work
        else if (request.method == 'POST') {
            const requestBody = await util.parseRequestBody(request);
            const queryString = requestBody.query;
            const variablesString = requestBody.variables;

            //graphql function here to take the query, query variables, resolvers
            graphql({ schema, source: queryString, rootValue: Resolver, variableValues: variablesString })
                .then(result => {
                    const queryResultString = JSON.stringify(result);
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(queryResultString);
                })
                .catch(error => { console.log(error); });
        }


        // else
        else {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('This demo does not support this action.');
        }
    }
});

// start the server
server.listen(serverPort, () => console.log(`Server listening on ${serverPort}`));
