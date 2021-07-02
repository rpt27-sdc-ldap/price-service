//const { Client } = require('pg');
// -- // const client = new Client({
// -- //     user: 'root',
// -- //     host: 'localhost',
// -- //     database: 'SDC',
// -- //     password: 'root',
// -- //     port: 5432,
// -- // });

// -- // client.connect();
// -- // console.log('connected to postgres');

// -- // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// -- // console.log(res.rows[0].message) // Hello world!
// -- // await client.end()


const faker = require('faker');
const { Pool } = require('pg');
const dotenv = require('dotenv');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'SDC',
  password: 'root',
  port: 5432,
});




// pool.query('SELECT NOW()', (err, res) => {
//   console.log('CONNECTED TO POSTGRES', err, 'res', res)
//   // -- //pool.end()
// })




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

    //let query = `INSERT INTO pricing (book_id, book_title, price) VALUES (${id}, ${title}, ${pricing})`

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

// -- const pgtools = require("pgtools");
// -- const config = {
// --   user: 'root',
// --   host: "localhost",
// --   password: "root",
// --   port: 5432
// -- };

// -- // pgtools.dropdb(config, 'SDC', function(err, res) {
// -- //   if (err) {
// -- //     console.error(err);
// -- //   }
// -- //   console.log(res);
// -- // })

// -- // pgtools.createdb(config, "SDC", function(err, res) {
// -- //   if (err) {
// -- //     console.error(err);
// -- //     process.exit(-1);
// -- //   }
// -- //   console.log('SDC DB Created in Postgres', res);
// -- // });

// -- DROP TABLE IF EXISTS pricing;

