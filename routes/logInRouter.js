const { Router } = require("express");
const loginController = require('../controllers/loginController.js');

const logInRouter = Router();

logInRouter.get('/', loginController.getLoginPage);

module.exports = logInRouter;