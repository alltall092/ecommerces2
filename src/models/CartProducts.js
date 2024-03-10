const db=require('../utils/db');
const {DataTypes}=require('sequelize');
/**
 * @openapi
 * components:
 *   schemas:
 *     CartProducts:
 *       type: object
 *       required:
 *         - id
 *         - quantity
 *         - cartId
 *         - productId
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Identificador único del producto en el carrito
 *         quantity:
 *           type: integer
 *           description: Cantidad del producto en el carrito
 *         cartId:
 *           type: integer
 *           description: Identificador del carrito al que pertenece el producto
 *         productId:
 *           type: integer
 *           description: Identificador del producto
 */


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