const { Router } = require('express');
const signUpController = require("../controllers/signUpController.js");

const signUpRouter = Router();

signUpRouter.get('/', signUpController.renderPage);

module.exports = signUpRouter;