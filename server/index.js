const express = require('express');
const path = require('path');
const db = require('../database/Models/Price.js');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', '/public')));

app.get('/', (req, res) => {
  res.end();
});

app.get('/api/price/:bookId(\\d+)', async (req, res) => {
  const book = await db.findBookId(req.params.bookId);
  res.send(JSON.stringify(book.dataValues));
});

app.get('/api/price/:bookTitle', async (req, res) => {
  const book = await db.findBookTitle(req.params.bookTitle);
  res.send(JSON.stringify(book.dataValues));
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});