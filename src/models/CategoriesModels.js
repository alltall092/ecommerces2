const db=require('../utils/db');
const { DataTypes }=require('sequelize');
/**
 * @openapi
 * components:
 *   schemas:
 *     Categories:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Identificador único de la categoría
 *         name:
 *           type: string
 *           description: Nombre de la categoría
 */
const  Categories=db.define('categories',{
id:{
type:DataTypes.INTEGER,
primaryKey:true,
autoIncrement:true,
allowNull:false},
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }



});
module.exports=Categories;