exports.getLoginPage = function(req, res, next) {
    res.render('loginPage', {
        title: "Login Page",
    });
};