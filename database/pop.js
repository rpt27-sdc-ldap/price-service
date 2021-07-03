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
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'SDC',
  password: process.env.POSTGRES_PASS,
  port: process.env.POSTGRES_PORT
});

pool.query('SELECT NOW()', (err, res) => {
  console.log('connected to postgres1', err, res)
  //pool.end()
})

let seedPostgres = async () => {
  let query = `
  DROP TABLE IF EXISTS pricing1;
  CREATE TABLE pricing1 (
  book_id SERIAL PRIMARY KEY,
  book_title VARCHAR (50),
  price NUMERIC (10, 2)
  )`

  await pool.query(query)
  .then((res) =>{
  console.log('pricing1 table created');
  })
  .catch((err) => {
  console.log('error creating pricing1 table:', err);
  })

  let importCsv = `COPY pricing1 FROM '/Users/denise/HackReactor2/SDC/price-service/database/postgres.csv' WITH DELIMITER ',' CSV HEADER;`;

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