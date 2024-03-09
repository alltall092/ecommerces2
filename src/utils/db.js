const {Sequelize}=require('sequelize');
require('dotenv').config();

const db = new Sequelize({
    database: process.env.DB_NAME || "boeu8hvoi5q1q4wyoase",
    username: process.env.DB_USER || "ukr8e6mcmkilza1u",
    host: process.env.DB_HOST || "boeu8hvoi5q1q4wyoase-mysql.services.clever-cloud.com",
    port: process.env.DB_PORT || 3306,
    password: process.env.DB_PASSWORD || "oQTd5VNutRFvSqQbml3A",
    dialect: "mysql",
    logging: false,
  });
  
  module.exports = db;