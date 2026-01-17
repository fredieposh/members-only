const { body, matchedData, validationResult} = require ('express-validator');
const dbHandler = require("../db/queries.js");
const bcrypt = require("bcryptjs");

const emptyError = "should not be empty";
const alphaError = "should contain only letters";
const capitalError = "should start with a capital letter";
const letterError = "should contain at least one letter";
const lengthError = "should be between 2 and 20 characters long";
const passLengthError = "should be between 2 and 20 characters long";
const structError = "should contain only letters, numbers and underscores";

async function isUserExists(username) {
    const rows = await dbHandler.getUserByUsername(username);
    return rows ? true : false;
};

const validateUserDetails = [
    body("username").trim()
        .notEmpty().withMessage(`Username ${emptyError}`)
        .matches(/[a-zA-Z]/).withMessage(`Username ${letterError}`)
        .matches(/^\w+$/).withMessage(`Username ${structError}`)
        .isLength({ min: 2, max: 20}).withMessage(`Username ${lengthError}`),
    body("password").trim()
        .notEmpty().withMessage(`Password ${emptyError}`)
        .isLength({ min: 8, max: 16}).withMessage(`Password ${passLengthError}`),
    body("firstName").trim()
        .notEmpty().withMessage(`First Name ${emptyError}`)
        .isAlpha().withMessage(`First Name ${alphaError}`)
        .matches(/^[A-Z][a-z]+$/).withMessage(`First Name ${capitalError}`)
        .isLength({ min: 2, max: 20}).withMessage(`First Name ${lengthError}`),
    body("lastName").trim()
        .notEmpty().withMessage(`Last Name ${emptyError}`)
        .isAlpha().withMessage(`Last Name ${alphaError}`)
        .matches(/^[A-Z][a-z]+$/).withMessage(`Last Name ${capitalError}`)
        .isLength({ min: 2, max: 20}).withMessage(`Last Name ${lengthError}`),
];

exports.getSignUpPage = function(req, res, next) {
    res.render('signUpPage', {
        title: "Sign Up Page"
    });
};

exports.postSignUpPage = [
    validateUserDetails,
    async function(req, res, next){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.render('signUpPage', {
                    title: "Sign Up Page",
                    errors,
                });
                return;
            };

            const newErrors = [];
            const { username ,password ,firstName ,lastName } = matchedData(req);

            if(await isUserExists(username)) {
                newErrors.push({ msg: "Username is taken. Try another one" });
                res.render('signUpPage', {
                    title: "Sign Up Page",
                    errors: newErrors,
                });
                return;
            };

            const enctryptedPassword = await bcrypt.hash(password, 10);

            await dbHandler.addUser(username ,enctryptedPassword ,firstName ,lastName);
            res.redirect('/log-in');

        } catch (err) {
            next(err);
        }
    },
];