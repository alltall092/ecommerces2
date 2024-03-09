
const Products=require('./ProductsModels');
const Categories=require('./CategoriesModels');
const Cart=require('./CartModels');
const Order=require('./OrderModels');
const Users = require('./UserModels');
const initModels = () =>{

Users.hasMany(Order);   // Un usuario puede tener muchos pedidos
Order.belongsTo(Users,{ foreignKey: 'userId',as:"order" }); // Un pedido pertenece a un usuario

//Users.hasOne(Cart); // Ejemplo de relación entre User y Cart
//Cart.belongsTo(Users); // Inverso de la relación anterior

Categories.hasMany(Products,{foreignKey:"categoryId",as:"categoryId"}); // Una categoría puede tener muchos productos
Products.belongsTo(Categories); // Un producto pertenece a una categoría

Cart.belongsToMany(Products, { through: 'CartProducts' }); // Un carrito puede tener muchos productos
Products.belongsToMany(Cart, { through: 'CartProducts' }); // Un producto puede estar en muchos carritos

Order.belongsToMany(Products, { through: 'OrderProducts' }); // Un pedido puede tener muchos productos
Products.belongsToMany(Order, { through: 'OrderProducts' }); // Un producto puede estar en muchos pedidos

}
module.exports=initModels;