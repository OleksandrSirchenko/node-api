const express = require('express');
const parser = require('body-parser');
const artistsController = require('./controllers/artists');
const constants = require('./constants');

let db = require('./db');

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello');
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
  
  app.listen(constants.PORT, () => {
    console.log(`Server is started on port ${constants.PORT}`);
  });
});
