exports.getLoginPage = function(req, res, next) {
    const messages = req.flash("error");

    errors = messages.map(message => { return { msg: message } });

    res.render('loginPage', {
        title: "Login Page",
        errors,
    });
};