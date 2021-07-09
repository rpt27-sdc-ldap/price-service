const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: 'SDC',
  password: process.env.POSTGRES_PASS,
  port: process.env.POSTGRES_PORT
});

const getBook = async (id) => {
  //console.log('READY TO FIND BOOK', id);
  let query = `SELECT * from pricing WHERE book_id = ${id};`;
  return await pool.query(query)
    .then((res) => {
      //console.log('FOUND IN PG', res.rows[0]);
      return res.rows[0];
    })
    .catch((err) => {
      console.log('error finding in PG', err)
    })
  ;
}

const getTitle = async (title) => {
  console.log('READY to find title', title)
  let query = `SELECT * from pricing WHERE book_title = ${title};`;
  return await pool.query(query)
    .then((data) => {
      //console.log('FOUND TITLE IN PG', data.rows[0]);
      return data.rows[0];
    })
    .catch((err) => {
      console.log('ERROR Finding Title in PG', err);
    })
}

const createBook = async (data) => {
  let query = `INSERT INTO pricing (book_id, book_title, price) VALUES (${data.book_id}, ${data.book_title}, ${data.price});`;
  return await pool.query(query)
    .then((res) => {
      console.log('Successfully Created new Book in pricing');
    })
    .catch((err) => {
      console.log('error creating new book in pricing', err);
    })
}

const updatePrice = async (id, price) => {
  let query = `UPDATE pricing SET price = ${price} WHERE book_id = ${id};`;

  return await pool.query(query)
    .then(() => {
      console.log('Successfully updated pricing');
    })
    .catch((err) => {
      console.log('Error updating pricing', err);
    });
}

const deleteBook = async (id) => {
  let query = `DELETE FROM pricing WHERE book_id = ${id};`;

  return await pool.query(query)
    .then(() => {
      console.log('Successfully Deleted record');
    })
    .catch((err) => {
      console.log('error deleting record', err);
    })
}

module.exports = {getBook, createBook, updatePrice, deleteBook, getTitle};