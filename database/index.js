// initialize and export connection to mysql database
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');
const priceModel = require('./Models/Price.js');

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

  const Price = sequelize.define('Price', priceModel.model, {
    timestamps: false
  });

  await sequelize.sync();
  console.log('Price Table Initialized!');

  await priceModel.init(sequelize, Price);

  return Price;
};

module.exports = init();
