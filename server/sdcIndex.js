const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const compression = require('compression');
const cors = require('cors');
const port = 3000;
const pg = require('../database/methods/pgMethods.js');

app.use(cors());

app.use(compression());
app.use(express.static(path.join(__dirname, '..', '/public')));
//app.use(bodyParser.json());
//app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.end();
});

app.get('/api/price/:bookId(\\d+)', (req, res) => {
  //console.log('GETT', req.params)
  let book_id = Number(req.params.bookId);

   return pg.getBook(book_id)
   .then((data) => {
     //console.log('BOOK', typeof data, data)
     res.status(200).send(JSON.stringify(data));
   })
   .catch((err) => {
     res.status(404).send('failed to find resource');
   });
});

// app.get('/api/price/:bookTitle', (req, res) => {
//    console.log('sdc index', req)
//   // const book = db.findBookTitle(Price.Price, req.params.bookTitle)
//   //   .then(book => {
//   //     res.send(JSON.stringify(book.dataValues));
//   //   })
//   //   .catch((err) => {
//   //     console.error(err);
//   //     res.status(404).send('failed to find resource');
//   //   });
// });

app.post('/api/price', (req, res) => {
  console.log('POST', req.query);

  return pg.createBook(req.query)
    .then(() => {
      //console.log('POST WAS SUCCESSFUL', res);
      res.status(200).end();
    })
    .catch((err) => {
      console.log('POST WAS UNSUCCESSFUL', err);
      res.status(404).send('Failed Creating Book')
    });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}. CORS enabled for whitelisted IPs listed on https://docs.google.com/document/d/13JU6MtAHHkve1uAwmuhXHuiYZHbYZ7uHa241Jf9lpEA/edit?usp=sharing`);
  });
}