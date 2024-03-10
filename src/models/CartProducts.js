const db=require('../utils/db');
const {DataTypes}=require('sequelize');



const CartProducts = db.define('CartProducts', {
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false},
  quantity: {

      type: DataTypes.INTEGER,
      defaultValue: 1
    },
   
  });
  module.exports=CartProducts;