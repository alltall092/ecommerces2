const db = require("../utils/db");
const { DataTypes } = require("sequelize");
const Categories=require('./CategoriesModels');

const Products=db.define("products",{
id:{type:DataTypes.INTEGER,
primaryKey:true,
autoIncrement:true,
allowNull:false
},
titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING, // Assuming you store the image path
    allowNull: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 // Assuming default value is 0
  }, 
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Categories,
      key: 'id'
    }
  }



}
);
module.exports=Products;