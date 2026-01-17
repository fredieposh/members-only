const { Router } = require("express");

const logOutRouter = Router();

logOutRouter.get('/', (req, res, next) => {
    req.logOut(err => {
        if (err) {
            return next(err);
        };
        res.redirect('/');
    })
});

module.exports = logOutRouter;