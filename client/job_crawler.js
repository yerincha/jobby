const db = require('../db/index.js');
const request = require('request');
const util = require('util');

const requestPromise = util.promisify(request)

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function crawlAndUpdateDb(data) {
  for (var i = 0; i < data.length; i++) {
    var companyName = data[i].name;

    var greenApiLink = `https://boards-api.greenhouse.io/v1/boards/${companyName.toLowerCase().trim().replace(' ', '-')}/jobs`;

    var leverApiLink = `https://api.lever.co/v0/postings/${companyName.toLowerCase().trim().replace(' ', '-')}`;

    try {
      const greenhouseResponse = await requestPromise(greenApiLink)
      var greenhouseResponseBodyJson = JSON.parse(greenhouseResponse.body);
      var greenHouseOpenNumbers = (greenhouseResponseBodyJson['jobs'] === undefined) ? 0 : greenhouseResponseBodyJson['jobs'].length;

      const leverResponse = await requestPromise(leverApiLink)
      var leverResponseBodyJson = JSON.parse(leverResponse.body);
      var leverOpenNumbers = (leverResponseBodyJson['jobs'] === undefined) ? 0 : leverResponseBodyJson['jobs'].length;

      const dbResult = await db.queryPromise(`UPDATE openings SET greenhouse = ${greenHouseOpenNumbers}, lever = ${leverOpenNumbers}, total = ${greenHouseOpenNumbers + leverOpenNumbers} WHERE id = ${data[i].id}`);

      console.log(`${companyName}: Open Positions GreenHouse -> ${greenHouseOpenNumbers}    Lever -> ${leverOpenNumbers}`);
    } catch (err) {
      console.log(err)
    }

    await sleep(300)
  }
}

// 1. Load All Company
// Iterate
//      Crawl Data
//      Update to DB
db.queryPromise('SELECT * FROM company')
  .then(function (data) {
    crawlAndUpdateDb(data);
  })