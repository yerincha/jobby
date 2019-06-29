const dbconfig = require('./dbconfig.js');

var mysql = require('mysql');

const Promise = require('bluebird');

var connection = mysql.createConnection({
  host: 'localhost',
  user: dbconfig.dbName,
  password: dbconfig.dbPassword,
  database: 'jobby'
});

var selectAll = function (callback) {
  connection.query('SELECT * FROM company inner join openings on company.id = openings.id ORDER BY openings.total DESC;', function (err, results, fields) {
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

var queryPromise = function (sql, args) {
  return new Promise((resolve, reject) => {
    connection.query(sql, args, (err, rows) => {
      if (err)
        return reject(err);
      resolve(rows);
    });
  });
}

module.exports = { selectAll, selectOne, queryPromise };