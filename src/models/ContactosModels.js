const db=require('../utils/db');
const {DataTypes}=require('sequelize');
/**
 * @openapi
 * components:
 *   schemas:
 *     Contactos:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *         - comentario
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Identificador único del contacto
 *         nombre:
 *           type: string
 *           description: Nombre del contacto
 *         email:
 *           type: string
 *           description: Correo electrónico del contacto
 *         comentario:
 *           type: string
 *           description: Comentario del contacto
 */
const Contactos=db.define("contactos",{
id:{type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false
    },
nombre:{
    type:DataTypes.STRING,
    allowNull:false
},
email:{
    type:DataTypes.STRING,
allowNull:true},

comentario:{type:DataTypes.STRING,
allowNull:false},




});
module.exports= Contactos;