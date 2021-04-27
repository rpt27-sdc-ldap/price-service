// initialize and export connection to mysql database

const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const priceModel = require('./Price.js');

const populate = async (Model) => {
  // create book prices ranging from $17 to $40
  const decimal = [0.0, 0.98, 0.99];
  const num = Array.from({length: 23}, (v, i) => i + 17);

  for (let i = 0; i < 100; i++) {
    const price = num[Math.floor(Math.random() * 23)] + decimal[Math.floor(Math.random() * 2)];

    await Model.create({
      book_id: i,
      price: price
    });
  }
};

const init = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root'
  });
  await connection.query('CREATE DATABASE IF NOT EXISTS `audible_price`;');

  const sequelize = new Sequelize('audible_price', 'root', null, {
    dialect: 'mysql'
  });

  try {
    await sequelize.authenticate();
    console.log('Mysql Connection has been established!');
  } catch(error) {
    console.error('Unable to connect to Mysql database');
  }

  const Price = sequelize.define('Price', priceModel.modelInstance, {
    timestamps: false
  });

  await sequelize.sync();
  console.log('Database and Tables Initialized!');

  await populate(Price);
  console.log('Populated Database!');
}

init();
module.exports = db = {};
