const {body, validationResult, matchedData} = require("express-validator");
const dbHandler = require("../db/queries.js");
const convertMessagesTimeFormat = require("./indexController.js").convertMessagesTimeFormat;

const validateComment = [
    body("comment").trim()
        .notEmpty().withMessage("Comment can't be empty"),
];

exports.postAddComment = [
    validateComment,
    async function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const isUserLogin = req.isAuthenticated();
            const user = isUserLogin ? req.user : null;
            const rows = await dbHandler.getMessages();
            const isAdmin = user ? user.admin : null;
            const messages = rows[0] ? convertMessagesTimeFormat(rows): null;

            res.render('indexPage', {
                title: "Home Page",
                isUserLogin,
                user,
                errors: errors.array(),
                messages,
                isAdmin
            });
            return;    
        };

        const { comment } = matchedData(req);

        try {
            await dbHandler.addMessage(req.params.id, comment)
        } catch(err) {
            next(err);
        };

        res.redirect('/');
    },
];