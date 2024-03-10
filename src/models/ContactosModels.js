const db=require('../utils/db');
const {DataTypes}=require('sequelize');

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