const express = require('express');
const path = require('path');
const compression = require('compression');
const Price = require('../database/index.js');
const db = require('../database/methods/price.js');
const app = express();
const cors = require('cors');
const port = 3000;

const whiteList = ['http://54.183.2.218','http://54.153.95.228','http://34.221.235.141','http://34.219.131.242','http://13.57.14.144','http://76.94.227.26','http://18.188.135.5','http://18.188.223.199', 'http://ec2-34-219-131-242.us-west-2.compute.amazonaws.com'];
const corsOpts = {
  origin: (origin, cb) => {
    if (whiteList.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  }
};


app.use(cors());
app.use(compression());
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
    console.log(`Server running on http://ec2-34-221-235-141.us-west-2.compute.amazonaws.com:${port}. CORS enabled for whitelisted IPs listed on https://docs.google.com/document/d/13JU6MtAHHkve1uAwmuhXHuiYZHbYZ7uHa241Jf9lpEA/edit?usp=sharing`);
  });
}

module.exports = app;
