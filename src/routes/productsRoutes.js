const {Router}=require('express');


const {getOrder,deleteCart,deleteTodoCart, getContactos,postContactos,webHook,productsRecientes,getProducts,postProducts,addCart,getCart, getCategories, checkOut}=require('../controllers');
const router=Router();
const bodyParser=require('body-parser');
// Routes
/**
 * @openapi
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: A list of products.
 */
/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     description: Create a new product.
 *     responses:
 *       200:
 *         description: Successfully created product.
 */

/**
 * @openapi
 * /recientes:
 *   get:
 *     summary: Obtiene los productos más recientes.
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: Productos recientes obtenidos correctamente.
 */
/**
 * @openapi
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Products]
 * 
 *     description: Retrieve a list of all categories.
 *     responses:
 *       200:
 *         description: A list of categories.
 */
/**
 * @openapi
 * /api/v1/cart:
 *   get:
 *     summary: Get cart items
 *     description: Retrieve items in the cart.
 *     responses:
 *       200:
 *         description: Items in the cart.
 */


/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Agrega un producto al carrito.
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Producto agregado correctamente al carrito.
 */
/**
 * @openapi
 * /api/v1/cart:
 *   get:
 *     summary: Obtiene el contenido del carrito.
 *     tags: [Cart]
 *     responses:
 *       '200':
 *         description: Contenido del carrito obtenido correctamente.
 */
/**
 * @openapi
 * /api/v1/checkout:
 *   post:
 *     summary: Procesa el pago y realiza el checkout del carrito.
 *     tags: [Cart]
 *     responses:
 *       '200':
 *         description: Checkout realizado correctamente.
 */


/**
 * @openapi
 * /api/v1/contactos:
 *   get:
 *     summary: Obtiene la lista de contactos.
 *     tags: [Contact]
 *     responses:
 *       '200':
 *         description: Lista de contactos obtenida correctamente.
 */
/**
 * @openapi
 * /api/v1/contact:
 *   post:
 *     summary: Agrega un nuevo contacto.
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Contacto agregado correctamente.
 */

/**
 * @openapi
 * /webhook:
 *   post:
 *     summary: Maneja los webhooks.
 *     tags: [Webhook]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '200':
 *         description: Webhook manejado correctamente.
 */
/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Obtiene la lista de órdenes.
 *     tags: [Order]
 *     responses:
 *       '200':
 *         description: Lista de órdenes obtenida correctamente.
 */

/**
 * @openapi
 * /deletecart/{id}:
 *   delete:
 *     summary: Elimina un producto del carrito por su ID.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a eliminar del carrito.
 *     responses:
 *       '200':
 *         description: Producto eliminado correctamente del carrito.
 */


/**
 * @openapi
 * /deletetodocart:
 *   delete:
 *     summary: Elimina todos los productos del carrito.
 *     tags: [Cart]
 *     responses:
 *       '200':
 *         description: Todos los productos eliminados correctamente del carrito.
 */
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