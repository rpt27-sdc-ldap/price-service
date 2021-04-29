// initialize and export connection to mysql database
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');
const priceModel = require('./Models/Price.js');

const initDB = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root'
  });

  await connection.query('CREATE DATABASE IF NOT EXISTS `audible_price`;');
};

initDB()
  .then(() => {
    const sequelize = new Sequelize('audible_price', 'root', null, {
      dialect: 'mysql'
    });
    module.exports.sequelize = sequelize;
    return sequelize;
  })
  .then( async (sequelize) => {
    await sequelize.authenticate();
    console.log('Mysql Connection has been established!');
    return sequelize;
  })
  .then( async (sequelize) => {
    const Price = sequelize.define('Price', priceModel.model, {
      timestamps: false
    });
    await sequelize.sync();
    console.log('Price Table Initialized!');
    module.exports.Price = Price;
    return { Price: Price, sequelize: sequelize };
  })
  .then((obj) => {
    return priceModel.init(obj.sequelize, obj.Price);
  });
