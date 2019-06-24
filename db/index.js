const dbconfig = require('./dbconfig.js');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: dbconfig.dbName,
  password: dbconfig.dbPassword,
  database: 'jobby'
});

var selectAll = function (callback) {
  connection.query('SELECT * FROM company', function (err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var selectOne = function (name, callback) {
  connection.query(`SELECT * FROM company WHERE name = "${name}"`, function (err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {selectAll, selectOne};
