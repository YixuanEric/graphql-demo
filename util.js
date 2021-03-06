const dbData = require('./engineer-data.json');

// native node js handles request body data in chunks, need to concat data together
function parseRequestBody(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(JSON.parse(body));
            });
        } catch (error) {
            reject(error);
        }
    });
}

//return all engineers 
function findAllEngineer() {
    return dbData;
}

// loop through the mock data to return engineers based on input arguments...
function findEngineer(input) {
    const result = [];
    const properties = Object.keys(input);
    for (let engineer of dbData) {
        let match = true;
        for (let property of properties) {
            if (engineer[property] != input[property]) {
                match = false;
            }
        }
        match && result.push(engineer);
    }
    return result;
}

function newEngineer(input) {
    dbData.push(input);
    return dbData;
}

module.exports = {
    parseRequestBody,
    findEngineer,
    findAllEngineer,
    newEngineer
};