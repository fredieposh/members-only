exports.renderPage = function(req, res, next) {
    res.render('signUpPage', {
        title: "Sign Up Page"
    });
};