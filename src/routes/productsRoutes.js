const {Router}=require('express');


const {getOrder,deleteCart,deleteTodoCart, getContactos,postContactos,webHook,productsRecientes,getProducts,postProducts,addCart,getCart, getCategories, checkOut}=require('../controllers');
const router=Router();
const bodyParser=require('body-parser');


  
router.get('/products',getProducts);

router.post('/products',postProducts);
router.get('/categories',getCategories);
router.post('/cart',addCart);
router.get('/cart',getCart);
router.post('/checkout',checkOut);
router.get('/recientes',productsRecientes);
router.get('/contactos',getContactos);
router.post('/contact',postContactos);
router.post('/webhook', bodyParser.raw({ type: 'application/json' }),webHook);
router.get('/orders',getOrder);
router.delete('/deletecart/:id',deleteCart);
router.delete('/deletetodocart',deleteTodoCart);
module.exports=router;