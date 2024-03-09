const { UserServices } = require("../services");
//const transporter = require("../utils/mailer");
const userRegister = async (req, res, next) => {
  try {
    const newUser = req.body;
    const result = await UserServices.create(newUser);
    res.status(201).json(result);
    /*await transporter.sendMail({
      from: "alltall659@gmail.com",
      to: result.email,
      subject: "Welcome to the best chat app ever",
      text: `Hello ${result.username}`,
      html: `<h1>Hello ${result.username}</h1>`,
    });*/
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "Faltan datos",
    });
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await UserServices.getAll();
    res.json(users);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "Algo salio mal",
    });
  }
};

module.exports = {
  userRegister,
  getAllUser,
};
