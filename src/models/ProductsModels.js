const db = require("../utils/db");
const { DataTypes } = require("sequelize");
const Categories=require('./CategoriesModels');
/**
 * @swagger
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       required:
 *         - id
 *         - titulo
 *         - price
 *         - cantidad
 *         - categoryId
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Identificador único del producto
 *         titulo:
 *           type: string
 *           description: Título del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         price:
 *           type: number
 *           format: decimal
 *           description: Precio del producto
 *         image:
 *           type: string
 *           description: Ruta de la imagen del producto
 *         cantidad:
 *           type: integer
 *           description: Cantidad disponible del producto
 *         categoryId:
 *           type: integer
 *           description: Identificador de la categoría a la que pertenece el producto
 */
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