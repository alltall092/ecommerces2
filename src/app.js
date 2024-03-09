const express=require('express');
const app=express();
const db=require('./utils/db');
const bodyParser=require('body-parser');
const {Order}=require('./models');
const {ProductsRoutes,AuthRoutes,UsersRoutes}=require('./routes');
const multer  = require('multer');
const  initModels=require('./models/initModels');
const handleError=require('./middlewares/error.middlewares');
const cors=require('cors');
const fileUpload = require('express-fileupload');
const morgan=require('morgan');
const stripe = require('stripe')('sk_test_51IOB3XGuY2qOE3VYB3Cloc6sGDOpRvWZ2RdNIiw6OLqxaHB40wJ6iuzAtgE50Kfxl3Ac1uihPYjzeTcvtNNbXEcY00FL06W9kq');
//const streamToBuffer = require('stream-to-buffer');
const {Router }=require('express');
const { StripeSignatureVerificationError } = require('stripe').errors;
const router=Router();

require('dotenv').config();
app.use(express.json());
//app.use('/api/v1')
app.use(cors());
//app.use(bodyParser.text({ type: 'application/json' }));

app.use(morgan("dev"));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(handleError);
app.use(express.static('public'));
app.use(bodyParser.json());

const crearOrden = async (sessionId) => {
  try {
    // Obtener los datos de la sesión de checkout de Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    // Crear la orden en la base de datos
    const nuevaOrden = await Order.create({
      totalAmount: checkoutSession.amount_total,
      status:"success"
      // Otros campos que desees guardar
    });

    // Retornar la nueva orden creada
    return nuevaOrden;
  } catch (error) {
    console.error('Error al crear la orden:', error);
    throw error;
  }
};

app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});
router.use(
  express.json({
      verify: (req, res, buffer) => (req['rawBody'] = buffer),
  })
);
app.post('/webhook', bodyParser.raw({type: 'application/json'}),async (req, res) => {
//const payload = req.rawBody || await streamToBuffer(req);
//const payload=req.rawBody;

const endpoint =process.env.STRIPE_WEBHOOK_SECRET;

try {
  const event = stripe.webhooks.constructEvent(req['rawBody'],req.headers['stripe-signature'] , endpoint);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      crearOrden(session);
      // Lógica para manejar el evento checkout.session.completed
      break;
    }
    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object;
      // Lógica para manejar el evento checkout.session.async_payment_succeeded
      break;
    }
    case 'checkout.session.async_payment_failed': {
      const session = event.data.object;
      // Lógica para manejar el evento checkout.session.async_payment_failed
      break;
    }
    default: {
      console.log(`Evento no manejado: ${event.type}`);
      break;
    }
  }

  res.status(200).end();
} catch (err) {
  if (err instanceof StripeSignatureVerificationError) {
    console.log("Error de verificación de firma del webhook:", err);
    return res.status(400).send('Firma del webhook inválida');
} else {
    console.log("Error al manejar el webhook:", err);
    return res.status(500).send('Error interno del servidor');
}
}
});

 app.use('/api/v1/products', express.static('uploads'));
db.authenticate()
  .then(() => console.log("Autenticac..ión exitosa"))
  .catch((error) => console.log(error));

db.sync({ force: false })
  .then(() => console.log("Base de datos sincronizada"))
  .catch((error) => console.log(error));
app.use('/api/v1',ProductsRoutes);

app.use('/api/v1',AuthRoutes);
app.use('/api/v1',UsersRoutes);
initModels();
app.get("/", (req, res) => {
    console.log("Bienvenido al server ");
    
    res.end();
  });

module.exports=app;