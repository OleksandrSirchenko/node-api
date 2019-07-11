const express = require('express');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const artistsController = require('./controllers/artists');

let db = require('./db');

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

const port = 3012;

app.get('/', (req, res) => {
  res.send('Hello')
});

app.get('/artists', artistsController.all);

app.post('/artists', artistsController.create);

app.put('/artists/:id', artistsController.update);

app.delete('/artists/:id', artistsController.delete);

app.get('/artists/:id', artistsController.findById);

db.connect('mongodb://localhost:27017/myapi', (err) => {
  if (err) {
    return console.log(err);
  }
  app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
  });
});
