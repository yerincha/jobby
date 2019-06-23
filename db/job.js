const csv = require('csv-parser');
const fs = require('fs');
const request = require('request');

var columns;

fs.createReadStream('./Bay-Area-Companies-List.csv')
.pipe(csv())
.on('headers', (headers) => {
    columns = headers;
  })
.on('data', (row) => {

    // GreenHouse API
    var greenApiLink = `https://boards-api.greenhouse.io/v1/boards/${row[columns[0]]}/jobs`;
    
    request(greenApiLink, function (error, response, body) {
        if ((response && response.statusCode) === 200) {
            var result = JSON.parse(body);
            var openNumbers = (result['jobs'] === undefined) ? 0 : result['jobs'].length;
            console.log(`${row[columns[0]]} : Open Positions -> ${openNumbers}`);
        } else {
            console.log(`${row[columns[0]]} : Open Positions -> 0`);
        }
    });

    // Lever API
    var leverApiLink = `https://api.lever.co/v0/postings/${row[columns[0]].toLowerCase().trim().replace(' ','-')}`;

    request(leverApiLink, function (error, response, body) {
        if ((response && response.statusCode) === 200) {
            var result = JSON.parse(body);
            console.log(`${row[columns[0]]} : Open Positions -> ${result.length}`);
        } else {
            console.log(`${row[columns[0]]} : Open Positions -> 0`);
        }
    });
})
.on('end', () => {
    console.log('CSV file successfully processed');
})