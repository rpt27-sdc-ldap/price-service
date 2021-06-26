const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const Price = require('../database/index.js');
const db = require('../database/methods/price.js');
const app = express();
const cors = require('cors');
const port = 3000;
//console.log('SERVERR', Price);

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
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.end();
});

app.get('/api/price/:bookId(\\d+)', (req, res) => {
  db.findBookId(Price.Price, req.params.bookId)
    .then(book => {
      res.send(JSON.stringify(book.dataValues));
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send('failed to find resource');
    });
});

app.get('/api/price/:bookTitle', (req, res) => {
  const book = db.findBookTitle(Price.Price, req.params.bookTitle)
    .then(book => {
      res.send(JSON.stringify(book.dataValues));
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send('failed to find resource');
    });
});

app.post('/api/price', (req, res) => {
  //console.log('REQQ', req.query)
  const newBook = db.createBook(Price.Price, req.query)
    .then((book) => {
      console.log('saved book to DB successfully');
      res.status(200);
      res.end();
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send('createBook Failed');
    });
});

app.patch('/api/price/update', (req, res) => {
  db.updatePrice(Price.Price, req.query)
    .then((response) => {
      console.log('patch response: ', response)
      res.status(200).send(response);
    })
    .catch((err) => {
      res,status(404).send('Patch Update Price failed', err);
    })
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}. CORS enabled for whitelisted IPs listed on https://docs.google.com/document/d/13JU6MtAHHkve1uAwmuhXHuiYZHbYZ7uHa241Jf9lpEA/edit?usp=sharing`);
  });
}

module.exports = app;
