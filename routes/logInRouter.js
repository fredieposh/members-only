const { Router } = require("express");
const loginController = require('../controllers/loginController.js');
const passport = require("passport");

const logInRouter = Router();

logInRouter.get('/', loginController.getLoginPage);
logInRouter.post('/', passport.authenticate("local",{
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureFlash: true,
}));

module.exports = logInRouter;