require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const compression = require('compression');
const cors = require('cors');
const cluster = require('cluster');
const {cpus} = require('os');

const numCPUs = cpus().length;

const port = 3000;
const pg = require('../database/methods/pgMethods.js');

app.use(cors());

app.use(compression());
app.use(express.static(path.join(__dirname, '..', '/public')));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));



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

app.get('/api/price/:bookTitle', async (req, res) => {
   //console.log('sdc index', req.params.bookTitle)
   return await pg.getTitle(req.params.bookTitle)
     .then((data) => {
       console.log('got the title', data)
       res.status(200).send(JSON.stringify(data));
     })
     .catch((err) => {
       res.status(404).send('Error to find title resource');
     });
});

app.post('/api/price', (req, res) => {
  //console.log('POST', req.query);
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

app.patch('/api/price/update', (req, res) => {
  //console.log('PATCH', req.query);
  return pg.updatePrice(req.query.book_id, req.query.price)
    .then(() => {
      console.log('PATCH WAS SUCCESSFUL')
      res.status(200).end();
    })
    .catch((err) => {
      console.log('PATCH WAS UNSUCCESSFUL', err);
      res.status(404).send('FAILED UPDATING PRICING');
    });
});

app.delete('/api/price/:id', (req, res) => {
  //console.log('DELETE', req.params);
  return pg.deleteBook(req.params.id)
    .then(() => {
      console.log('DELETE WAS SUCCESSFUL')
      res.status(200).end();
    })
    .catch((err) => {
      res.status(404).send('FAILED TO DELETE BOOK', err);
    })
});

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}. CORS enabled for whitelisted IPs listed on https://docs.google.com/document/d/13JU6MtAHHkve1uAwmuhXHuiYZHbYZ7uHa241Jf9lpEA/edit?usp=sharing`);
    });
  }
}
