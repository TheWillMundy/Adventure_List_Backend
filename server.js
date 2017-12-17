
const express        = require('express');
// Interacts with Database
// const MongoClient    = require('mongodb').MongoClient;
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = 8000;

//Enables us to read req.body
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//Enable CORS
const enableCORS = function(req, res, next) {
     res.header("Access-Control-Allow-Origin", req.headers.origin);
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
     res.header("Access-Control-Allow-Credentials", "true");
     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
     if (req.method === "OPTIONS") {
          res.status(200).send('OK')
     } else {
          next();
     }
}

app.use(enableCORS)
//Connect to MongoDB through MongoClient
// MongoClient.connect(db.url, (err, database) => {
//   if (err) return console.log(err)
//   //Routes are accessible through server.js now
//   require('./app/routes')(app, database);
//
//   app.listen(port, () => {
//     console.log('We are live on ' + port);
//   });
// })

//Connect to MongoDB through Mongoose
mongoose.connect(db.url)
let db_connect = mongoose.connection
db_connect.on('error', console.error.bind(console, 'connection error:'));
db_connect.once('open', () => {
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log("We are live on: " + port);
  })
});
