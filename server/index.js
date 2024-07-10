const express = require('express');
const db = require('../database/db.js');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

app.get('/pokemon', (req, res) => {
  db.find()
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});
app.patch('/pokemon', (req, res) => {
  db.findOneAndUpdate(
    { Number: 9999 },
    req.body
  )
  .then(() => {
    res.status(200).send('success')
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});