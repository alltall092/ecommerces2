const {userLogin}=require('./authController');
const { userRegister,getAllUser}=require('./userController');
const {deleteCart,deleteTodoCart,getOrder,webHook,getContactos,postContactos,productsRecientes,getProducts,postProducts,addCart,getCart,getCategories,checkOut }=require('./productsController');





module.exports={deleteCart,deleteTodoCart,getOrder,getContactos,postContactos,webHook,productsRecientes,userLogin,getAllUser,userRegister,getProducts,postProducts,addCart,getCart,getCategories,checkOut}