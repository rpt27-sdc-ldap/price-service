// methods for interacting with Price Table
const { DataTypes } = require('sequelize');

const Price = {
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  price: {
    type: DataTypes.FLOAT
  }
};

module.exports.modelInstance = Price;

