exports.getIndexPage = async function(req, res, next ) {
    const isUserLogin = req.isAuthenticated();
    const user = isUserLogin ? req.user : null;
    res.render('indexPage', {
        title: "Home Page",
        isUserLogin,
        user,
        // messages,
    })
};