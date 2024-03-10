const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Products = require('./ProductsModels');

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - id
 *         - totalAmount
 *         - status
 *         - productId
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único de la orden
 *         totalAmount:
 *           type: number
 *           format: decimal
 *           description: Monto total de la orden
 *         status:
 *           type: string
 *           description: Estado de la orden (pendiente, enviado, entregado, etc.)
 *         productId:
 *           type: integer
 *           description: Identificador del producto asociado a la orden
 */
const Order = sequelize.define('Order', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false},
        
          totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
          },
          status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending' // Podría ser 'pending', 'shipped', 'delivered', etc.
          },
          productId: {
            type: DataTypes.INTEGER,
            references: {
              model: Products,
              key: 'id'
            }
          }

  // Puedes agregar campos adicionales según sea necesario
});

module.exports = Order;
