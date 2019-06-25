const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cheerio = require('cheerio');
const cloudscraper = require('cloudscraper');

const db = require('../db/index.js');


const app = express();
const port = 3333;
app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(bodyParser.json());
app.use(cors());

app.get('/items', function (req, res) {
  db.selectAll((err, data)=>{
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/company', (req, res, next) => {
  const { name } = req.query;
  db.selectOne(name, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  })
});
app.get('/angellist', function (req, res) {

  var companyName = req.query.company_name;
  cloudscraper.get(`https://angel.co/company/${companyName}/jobs`)
    .then(function (htmlString) {
      const $ = cheerio.load(htmlString);

      var jobList = [];

      $('.job-listings').find('.s-grid.s-grid--outer').each(function (i, elem) {
        var title = $(this).find('.u-fontSize18').text();
        var link = $(this).find('.u-fontSize18').attr('href');
        var location = $(this).find('.listing-data').text().split('\n·\n')[0].trim();
        var type = $(this).find('.listing-data').text().split('\n·\n')[1].trim();
        var salary = $(this).find('.listing-data').text().split('\n·\n')[2] === undefined ? '' : $(this).find('.listing-data').text().split('\n·\n')[2].trim();

        jobList.push({
          id: link,
          title: title,
          location: location,
          absolute_url: link,
        });
      });

      res.send({ jobList: jobList });
    })
    .catch(function (err) {
      res.sendStatus(500);
    });

});

app.get('/stackoverflow', function (req, res) {

  var companyName = req.query.company_name;

  cloudscraper.get(`https://stackoverflow.com/jobs/companies/${companyName}#jobs-items`)
    .then(function (htmlString) {
      const $ = cheerio.load(htmlString)

      var jobList = [];

      $('.-job-summary').each(function (i, elem) {
        var title = $(this).find('.job-details__spaced.mb4').find('a').attr('title');
        var link = 'https://stackoverflow.com' + $(this).find('.job-details__spaced.mb4').find('a').attr('href');
        var postTime = $(this).find('.t24').text();
        var location = $(this).find('.fs-body2').children('span:nth-child(2)').text().replace('- \n', '').trim();

        jobList.push({
          id: link,
          title: title,
          location: location,
          absolute_url: link,
          updated_at: postTime
        });
      });

      res.send({ jobList: jobList });
    })
    .catch((err) => {
      res.sendStatus(500);
    });

});

app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});
