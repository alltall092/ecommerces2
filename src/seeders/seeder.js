const db = require("../utils/db");
const {Users,Products,Categories,Contactos} = require("../models");
const initModels = require("../models/initModels");


initModels();

const users = [
  {
    username:"maria",
    email: "maria@gmail.com",
    password: "1234",
  
 
  },
  {
    username:"jose01",
    email: "jose01@gmail.com",
    password: "pass1234",
  
  }
];

const contactos = [
  {
    nombre:"maria",
    email: "maria@gmail.com",
    comentario: "dsffdsdsdsdsds",
 
  },
  {
    nombre:"jose01",
    email: "jose01@gmail.com",
    comentario: "dfdsdsdsds",
  }
];

const products = [
    {
      titulo: 'Producto 1',
      image: 'imagen1.jpg',
      price: 29.99,
      cantidad: 10,
      description: 'Descripción del Producto 1',
      // ID de la categoría a la que pertenece el producto
    },
    {
      titulo: 'Producto 2',
      image: 'imagen2.jpg',
      price: 49.99,
      cantidad: 5,
      description: 'Descripción del Producto 2',
 // ID de la categoría a la que pertenece el producto
    },
    // Puedes seguir añadiendo más objetos con la misma estructura
  ];
  
  const categories = [
    { name: 'Computadora' },
    { name: 'Televisión' },
    { name: 'Teléfono inteligente' },
    { name: 'Tableta' },
    { name: 'Laptop' },
    { name: 'Consola de videojuegos' },
    { name: 'Impresora' },
    { name: 'Cámara digital' },
    { name: 'Dispositivo de almacenamiento' },
    { name: 'Wearable' }, // Dispositivos portátiles (ejemplo: smartwatches)
    { name: 'Robótica' },
    { name: 'Realidad virtual (VR)' },
    { name: 'Realidad aumentada (AR)' },
    { name: 'Internet de las cosas (IoT)' },
    { name: 'Inteligencia artificial (IA)' },
    { name: 'Redes y comunicaciones' },
    // Puedes agregar más categorías según sea necesario
];





  


  

db.sync({ force: true }).then(() => {
  console.log("Sinronizado");
  users.forEach(async (user) => await Users.create(user));
  setTimeout(() => {
    products.forEach(
      async (product) => await Products.create(product));
  }, 100);
  setTimeout(() => {
    categories.forEach(
      async (carts) => await Categories.create(carts)
    );
  }, 200);
  setTimeout(() => {
    contactos.forEach(async (productincarts) => await Contactos.create(productincarts));
  }, 300);
  
  setTimeout(() => {
    //contactos.forEach(async (productincarts) => await Contactos.create(productincarts));
  }, 400);


});