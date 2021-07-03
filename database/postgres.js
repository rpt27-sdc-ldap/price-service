const faker = require('faker');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'SDC',
  password: process.env.POSTGRES_PASS,
  port: process.env.POSTGRES_PORT
});

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

  for (var i = 0; i < 10000000; i++) {
    let id = i;
    let title = await faker.lorem.words();
    let pricing = await faker.finance.amount();
    console.log('booktitle', title, pricing)

    let query = {
      text: 'INSERT INTO pricing(book_id, book_title, price) VALUES($1, $2, $3)',
      values: [id, title, pricing],
    }
    await pool.query(query)
      .catch((err) => {
        console.log(`error saving to DB at ${i}:`, err);
      })
  }
  console.log('SAVED TO DB SUCCESSFULLY');
}

seedPostgres();