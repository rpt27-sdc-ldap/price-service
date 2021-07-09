const cassandra = require('cassandra-driver');
//const csv = require('./postgres.csv');
require('dotenv').config();

// const PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;

// const client = new cassandra.Client({
//   contactPoints: ['127.0.0.1'],
//   protocolOptions: {port: '9042'},
//   localDataCenter: 'SDC',
//   keyspace: 'pricing'
// });

// client.connect((res, err) => {
//   console.log('res', res);
//   console.log('err', err)
// });

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1'
});

client.connect()
  .then((res) => {
    console.log('connected to cassandra!')
  })
  .catch((err) => {
    console.log('err connecting', err)
  })

const createKeyspace = `CREATE KEYSPACE IF NOT EXISTS Pricing WITH REPLICATION = {'class' : 'SimpleStrategy','replication_factor' : 1}`
const createTable = `CREATE TABLE IF NOT EXISTS Pricing.pricing (book_id int, book_title TEXT, price DECIMAL, PRIMARY KEY (book_id))`

client.execute(createKeyspace)
  .then((res) => {
    console.log('CREATED Keyspace Pricing', res)
  })
  .catch((err) => {
    console.log('error creating Keyspace Pricing', err)
  });

client.execute(createTable)
  .then((res) => {
    console.log('CREATED Table pricing', res)
  })
  .catch((err) => {
    console.log('error creating Table pricing', err)
  });

// const importCsv = `COPY Pricing.pricing (book_id, book_title, price) FROM '/Users/denise/HackReactor2/SDC/price-service/database/data.csv' WITH header=true and delimiter=','`

// client.execute(importCsv)
//   .then((res) => {
//     console.log('Imported CSV successfully');
//   })
//   .catch((err) => {
//     console.log('error importing CSV', err)
//   })

client.shutdown();