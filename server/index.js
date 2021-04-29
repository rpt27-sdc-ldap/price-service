const express = require('express');
const path = require('path');
const db = require('../database/index.js');
const db2 = require('../database/Models/Price.js');
const app = express();
const port = 3000;

console.log('=== Price ===>', db);

// const db = require('../database/index');

app.use(express.static(path.join(__dirname, '..', '/public')));

app.get('/', (req, res) => {
  res.end();
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});