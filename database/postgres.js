const { Pool } = require('pg');
require('dotenv').config();

// //uncomment to create or delete database
// const pgtools = require("pgtools");
// const config = {
//   user: process.env.DB_USER,
//   host: "localhost",
//   password: process.env.POSTGRES_PASS,
//   port: process.env.POSTGRES_PORT
// };

// pgtools.dropdb(config, 'SDC', function(err, res) {
//   if (err) {
//     console.error(err);
//   }
//   console.log(res);
// })

// pgtools.createdb(config, "SDC", function(err, res) {
//   if (err) {
//     console.error(err);
//     process.exit(-1);
//   }
//   console.log('SDC DB Created in Postgres', res);
// });

const pool = new Pool({
  user: 'denise',
  host: 'ec2-3-101-105-97.us-west-1.compute.amazonaws.com',
  database: 'SDC',
  password: 'root',
  port: 5432
});

pool.query('SELECT NOW()', (err, res) => {
  console.log('connected to postgres1', err, res)
  //pool.end()
})

let seedPostgres = async () => {
  let query = `
  DROP TABLE IF EXISTS pricing;
  CREATE TABLE pricing (
  book_id SERIAL PRIMARY KEY,
  book_title VARCHAR (50),
  price NUMERIC (10, 2)
  )`

  await pool.query(query)
  .then((res) =>{
  console.log('pricing table created');
  })
  .catch((err) => {
  console.log('error creating pricing table:', err);
  })

  let importCsv = `COPY pricing FROM '/Users/denise/HackReactor2/SDC/price-service/database/data.csv' WITH DELIMITER ',' CSV HEADER;`;

  await pool.query(importCsv)
   .then((res) => {
     console.log('Import csv was successful');
   })
   .catch((err) => {
     console.log('error importing csv file:', err);
   })

  console.log('SAVED TO DB SUCCESSFULLY');
}

seedPostgres();

module.exports = pool;