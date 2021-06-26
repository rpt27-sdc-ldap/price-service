// initialize and export connection to mysql database
const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const methods = require('./methods/price.js');

let db = {};

const init = async () => {
  // const connection = await mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root'
  // });

  const connection = await mysql.createConnection({
    //host: 'localhost',
    user: 'root',
    password: ''
  });

  await connection.query('CREATE DATABASE IF NOT EXISTS `audible_price`;');

  // const sequelize = new Sequelize('audible_price', 'root', null, {
  //   dialect: 'mysql',
  //   logging: false
  // });
  const sequelize = new Sequelize('audible_price', 'root', '', {
    dialect: 'mysql',
    logging: false
  });
  db.sequelize = sequelize;

  db.Price = require('./Models/Price.js')(sequelize);

  await sequelize.sync();

  methods.init(sequelize, db.Price);
};

init();
module.exports = db;