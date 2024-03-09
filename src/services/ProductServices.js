const {Products,Categories,CartProducts,Cart, Contactos, Order}=require('../models');
class ProductServices{
static async getProducts(){
try {
    
    const productsByCategories = await Products.findAll();

    return productsByCategories;
} catch (error) {
    throw error;
}

    
}
static async categories(){
try {
  const categories=await Categories.findAll();
  return categories;
} catch (error) {
  throw error;
}


}

static async addCart(productId) {
  try {
    // Buscar el carrito asociado al producto
    let cart = await Cart.findOne({
      where: {
        productId: productId
      }
    });

    // Crear el carrito si no existe
  if(!cart){
      cart = await Cart.create({
        productId: productId
      });
    
    }

    // Buscar el producto en el carrito
  let cartProduct = await CartProducts.findOne({
      where: {
        productId: productId,
        CartId: cart.id
      }
    });

    // Si el producto del carrito existe, incrementar su cantidad en 1
    if (cartProduct) {
      cartProduct.quantity += 1;
      await cartProduct.save();
    } else {
      // Si el producto del carrito no existe, crear uno nuevo con cantidad 1
      cartProduct = await CartProducts.create({
        productId: productId,
        CartId: cart.id,
        quantity: 1
      });
    }

    // Devolver el producto del carrito después de crear o actualizar
    return cartProduct;
  } catch (error) {
    // Capturar y lanzar cualquier error ocurrido durante el proceso
    throw error
  }
}

static async getCart(){
try {
 const cart=await Cart.findAll({
    include: [{
      model: Products,
      through: 'CartProducts' // Especifica el nombre de la tabla intermedia
    }]
  })
    
    return cart;
} catch (error) {
    throw error;
    
}



}
static async getOrder(){
  try {
   const cart=await Order.findAll({
      include: [{
        model: Products,
        through: 'OrderProducts' // Especifica el nombre de la tabla intermedia
      }]
    })
      
      return cart;
  } catch (error) {
      throw error;
      
  }
  
  
  
  }
  

static async postProducts(datos){
  
try {

    const product=await Products.bulkCreate(datos);
    
    return product;
} catch (error) {
    throw error;
}


}
static async getProductsRecientes(){
try {
  const productosRecientes = await Products.findAll({
    order: [['createdAt', 'DESC']], // Ordena por fecha de creación en orden descendente
    limit: 3 // O el número de productos recientes que desees obtener
  });
return productosRecientes;
} catch (error) {
  throw error;
}


}
static async deleteCart(id){
try {
  const cart = await Cart.findOne({ where: { id: id } });

if (cart) {
    // Si se encuentra el carrito, procedemos a eliminarlo
    await Cart.destroy({ where: { id: id } });

    // Ahora, eliminamos los productos asociados al carrito eliminado
    await CartProducts.destroy({ where: { productId: cart.productId } });
} else {
    console.log("No se encontró el carrito con el ID especificado.");
}
return cart;

} catch (error) {
  throw error;
}

}
static async deleteTodoCart(){
try {
  const cartDeleted = await Cart.destroy({
    where: {},
    truncate: true // Esto eliminará todos los registros sin hacer una transacción
  });
  
  // Eliminar todos los registros de la tabla CartProducts
  const productsDeleted = await CartProducts.destroy({
    where: {},
    truncate: true
  });

  return { cartDeleted, productsDeleted }; 
} catch (error) {
  throw error;
}


}
static async postContactos(datos){
try {
  const con=await Contactos.create(datos);
  return con;
} catch (error) {
  throw error;
}



}
static async getContactos(){
try {
  const con=await Contactos.findAll();
  return con;
} catch (error) {
  throw error;
}

}

}
module.exports=ProductServices;