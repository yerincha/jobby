const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db/index.js');
var items = require('../db');


const app = express();
const port = 3333;
app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(bodyParser.json());
app.use(cors());

app.get('/items', function (req, res) {
  items.selectAll(function (err, data) {
    console.log(err);
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});
// app.get('*.js', (req, res, next) => {
//   req.url = `${req.url}.gz`;
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

// app.get('/room', (req, res) => {
//   db.Room.findAll({
//     where: {
//       id: req.query.id,
//     },
//   })
//     .then((result) => {
//       res.send(result[0].dataValues);
//     })
//     .catch(() => {
//       res.sendStatus(500);
//     });
// });

// app.get('/booking', (req, res) => {
//   db.Booking.findAll({
//     where: {
//       roomId: req.query.id,
//     },
//   })
//     .then((result) => {
//       res.send(result);
//     })
//     .catch(() => {
//       res.sendStatus(500);
//     });
// });



app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});
