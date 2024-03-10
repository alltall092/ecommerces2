const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
/**
 * @openapi
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - id
 *         - productId
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Identificador único del carrito
 *         productId:
 *           type: integer
 *           description: Identificador del producto en el carrito
 */

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
