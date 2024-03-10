const fs = require('fs').promises;
const fs1 = require('fs');   
const multer = require('multer');
const path = require('path');
const stripe = require('stripe')('sk_test_51IOB3XGuY2qOE3VYB3Cloc6sGDOpRvWZ2RdNIiw6OLqxaHB40wJ6iuzAtgE50Kfxl3Ac1uihPYjzeTcvtNNbXEcY00FL06W9kq');
require('dotenv').config();

const YOUR_DOMAIN = 'http://localhost:5173';
//const streamToBuffer = require('stream-to-buffer');
const { ProductServices}=require('../services');
const { Order } = require('../models');

const getProducts= async(req,res,next)=>{
try {
    
    const filesFromDB=await ProductServices.getProducts();
    const filesFromFS = await fs.readdir('uploads');
    console.log('Archivos en uploads:', filesFromFS);
    const imageUrls = filesFromDB
    .filter((fileFromDB) => filesFromFS.includes(fileFromDB.image))
    .map((file) =>({
        id:file.id,
        titulo:file.titulo,
        url: `${req.protocol}://${req.get('host')}/api/v1/products/${file.image}`,
        cantidad:file.cantidad,
        precio:file.price,
        decripcion:file.description,
        categoryId:file.categoryId

    }))

     res.json(imageUrls).status(200);
     
} catch (err) {
    console.log('error no carga los datos',err);
}



}
const getCategories= async(req,res,next)=>{
try {
    const categories=await ProductServices.categories();
res.json(categories).status(200);
} catch (error) {
    console.log('no cargan los datos');
}



}
const postProducts=async(req,res,next)=>{
   
console.log(req.files.image.name);
try {
   
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded.' });
      }
    
      // Access the uploaded file using the name attribute (in this case, "file")
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({ message: 'No files were uploaded.' });
      }
    
      const EDFile = req.files.image;
      const uploadPath = `./uploads/${EDFile.name}`;
      
      if (!fs1.existsSync('./uploads')) {
        fs1.mkdirSync('./uploads');
      }
      
      EDFile.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
    
        return res.status(200).send({ message: 'File uploaded successfully.' });
    });
   
 


    const titulo=req.body.titulo;
    const price=req.body.price;
    const cantidad=req.body.cantidad;
    const image=req.files.image.name;
    const description=req.body.description;
    const categoryId=req.body.categoryId;


const datos=[{titulo:titulo,
price:price,
cantidad:cantidad,
image:image,
description:description,
categoryId:categoryId}];


  const product=await ProductServices.postProducts(datos);
  res.json(product).status(201);


} catch (error) {
    next({
        status: 500,
        errorContent: error,
        message: "no se pueden cagar los datos",
      });
      
}



}
const addCart=async(req,res,next)=>{

try {
    const productId= req.body.productId;
    
    const cartProduct=await ProductServices.addCart(productId);
    res.json(cartProduct).status(201);
} catch (error) {
    console.log('no ser pueden insertar los datos',error)
}



}

const getCart=async(req,res,next)=>{
try {
    const filesFromDB=await ProductServices.getCart();
    const filesFromFS = await fs.readdir('uploads');
    console.log('Archivos en uploads:', filesFromFS);
    const products=[];
   const imageUrls = filesFromDB.map(x=>{
    
    return  x.products.filter((fileFromDB) => filesFromFS.includes(fileFromDB.image))
    .map((file) =>({
        id:file.id,
        titulo:file.titulo,
        url: `${req.protocol}://${req.get('host')}/api/v1/products/${file.image}`,
        cantidad:file.cantidad,
        precio:file.price,
        decripcion:file.description,
        categoryId:file.categoryId,
        quantity:file.CartProducts.quantity,
        cartId:file.CartProducts.CartId,
        productId:file.CartProducts.productId

    })) });
 




    res.json(imageUrls).status(200);
} catch (error) {
    console.log("no se pueden cargar  los datos",error);
}


}
const checkOut= async(req,res)=>{
    
    try {

        const total = req.body.total;
        const totalEnCentavos = total * 100;
        
        const items = req.body.item; // Cambiado de 'item' a 'items' para mayor claridad

        const products = [];
        const prices = [];
        const lineItems = [];
        
           // Crea la orden en la base de datos utilizando Sequelize
   /* const order = await Order.create({
        totalAmout:totalEnCentavos,
        status:"pendiente",
        
        isPaid: false,
        // Puedes agregar más detalles de la orden aquí según sea necesario
      });*/
        // Crear productos en Stripe
        for (const itemData of items) {
            const product = await stripe.products.create({
                name: itemData.titulo,
                description: itemData.descripcion,
                images: [itemData.url],
            });
            products.push(product);
        
            // Crear precios en Stripe para cada producto
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: parseFloat(itemData.precio)*100, // Asegúrate de tener este valor definido correctamente
                currency: 'dop',
            });
            
            prices.push(price);
        
            // Agregar el producto y el precio al arreglo de lineItems
            lineItems.push({
                price: price.id,
                quantity: itemData.cantidad || 1, // Si la cantidad no está definida, establecemos 1 por defecto
            });
        }
        
        // Crear la sesión de pago en Stripe
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}/cancel`,
            metadata:{totalEnCentavos:totalEnCentavos}
            
        });
        
        res.json({ url: session.url}); // Retorna la URL de la sesión de pago
        
    } catch (error) {
        console.log('Error al crear la sesión de pago:', error);
        
    }
   
}
const productsRecientes= async(req,res)=>{
try {
    const filesFromDB=await ProductServices.getProductsRecientes();
    const filesFromFS = await fs.readdir('uploads');
    console.log('Archivos en uploads:', filesFromFS);
    const imageUrls = filesFromDB
    .filter((fileFromDB) => filesFromFS.includes(fileFromDB.image))
    .map((file) =>({
        id:file.id,
        titulo:file.titulo,
        url: `${req.protocol}://${req.get('host')}/api/v1/products/${file.image}`,
        cantidad:file.cantidad,
        precio:file.price,
        decripcion:file.description,
        categoryId:file.categoryId

    }))
    res.json(imageUrls).status(200);
} catch (err) {
    console.log('los datos no se pueden cargar',err);
}



}

/*async function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        console.log(reject);
        console.log(resolve);
        console.log(chunks);
    });
  }*/
  async function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        
        // Manejar eventos del stream
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => {
            // Concatenar todos los chunks en un Buffer
            const buffer = Buffer.concat(chunks);
            
            // Resolver la promesa con el Buffer resultante
            resolve(buffer);
        });
    });
}
  
const webHook = async (req, res) => {
    // ...

}
const postContactos=async(req,res)=>{
try {
    const datos=req.body;
    const contact=await ProductServices.postContactos(datos);
    res.json(contact).status(201);
} catch (error) {
    console.log('error al guardar los datos')
    
}



}
const getContactos= async(req,res)=>{
try {
    const contact=await ProductServices.getContactos();
    res.json(contact).status(200);
} catch (error) {
    console.log('error no cargar los datos')
}



}
const getOrder=async(req,res)=>{
try {
const order=await ProductServices.getOrder();
res.json(order).status(200);
} catch (error) {
    console.log('no cargan los datos')
}


}
const deleteCart=async(req,res)=>{
try {
const id=req.params.id;

    const cart=await ProductServices.deleteCart(id);
    res.json(cart).status(200);
} catch (err) {
    console.log("error al eliminar productos",err)
}


}
const deleteTodoCart=async(req,res)=>{
try {
    const [cart,productCart]=await ProductServices.deleteTodoCart();
    res.json({cart,productCart}).status(200);
} catch (error) {
    console.log('error no se pueden eliminar');
    
}



}

module.exports={deleteCart,deleteTodoCart,getOrder,postContactos,getContactos,webHook,productsRecientes, getProducts,postProducts,addCart,getCart,getCategories,checkOut}