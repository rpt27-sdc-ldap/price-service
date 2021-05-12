const express = require('express');
const path = require('path');
const Price = require('../database/index.js');
const db = require('../database/methods/price.js');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', '/public')));

app.get('/', (req, res) => {
  res.end();
});

app.get('/api/price/:bookId(\\d+)', async (req, res) => {
  const book = await db.findBookId(Price.Price, req.params.bookId);
  res.send(JSON.stringify(book.dataValues));
});

app.get('/api/price/:bookTitle', async (req, res) => {
  const book = await db.findBookTitle(Price.Price, req.params.bookTitle);
  res.send(JSON.stringify(book.dataValues));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app;