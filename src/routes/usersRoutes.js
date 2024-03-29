const {Router }=require('express');
const { userRegister,getAllUser}=require('../controllers');
const router=Router();
/**
 * @openapi
 * paths:
 * api/v1/register:
 *   post:
 *     summary: Registra un nuevo usuario.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Usuario registrado correctamente.
 */


/**
 * @openapi
 * paths:
 * api/v1/register:
 *   get:
 *     summary: Obtiene todos los usuarios registrados.
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Lista de usuarios obtenida correctamente.
 */
router.post('/register',userRegister);
router.get('/register',getAllUser);


module.exports=router;