const express = require('express');
const path = require('path');
const Price = require('../database/index.js');
const db = require('../database/methods/price.js');
const app = express();
const cors = require('cors');
const port = 3000;

const corsOpts = {
  origin: 'http://localhost:5500',
  optionsSuccessStatus: 200
};

app.use(express.static(path.join(__dirname, '..', '/public')));

app.get('/', cors(corsOpts), (req, res) => {
  res.end();
});

app.get('/api/price/:bookId(\\d+)', cors(corsOpts), async (req, res) => {
  const book = await db.findBookId(Price.Price, req.params.bookId);
  res.send(JSON.stringify(book.dataValues));
});

app.get('/api/price/:bookTitle', cors(corsOpts), async (req, res) => {
  const book = await db.findBookTitle(Price.Price, req.params.bookTitle);
  res.send(JSON.stringify(book.dataValues));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}. CORS enabled from port 5500`);
  });
}

module.exports = app;
