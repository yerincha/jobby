const dbconfig = require('./dbconfig.js');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: dbconfig.dbName,
  password: dbconfig.dbPassword,
  database: 'jobby'
});

var selectAll = function (callback) {
  connection.query('SELECT * FROM company limit 10', function (err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;
