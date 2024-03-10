const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Cart = sequelize.define('Cart', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false},

      productId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      }
      // Puedes agregar 
});

module.exports = Cart;
