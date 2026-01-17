const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { Pool } = require('pg');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const indexRouter = require('./routes/indexRouter.js');
const signUpRouter = require('./routes/signUpRouter.js');
const logInRouter = require('./routes/logInRouter.js');

const app = express();
const pool = new Pool ({
    host:       'localhost',
    user:       'maorgo92',
    database:   'members_only',
    password:   '',
    port:       '5432'
});

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(session({
    store: new (require('connect-pg-simple')(session))({
        pool,
        tableName: "user_sessions",
        createTableIfMissing: true
    }),
    secret: 'cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(new localStrategy(async (username, password, done) => {
    try {
        const {rows} = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = rows[0];

        if(!user) {
            return done(null, false, {message: "Incorrect username"})
        };

        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return done(null, false, {message: "Incorrect password"});
        };

        return done(null, user);
    } catch(err) {
        return done(err);
    }
}));

passport.serializeUser(async (user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];

        done(null, user);
    } catch(err) {
        err;
    };
});

// app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);
app.use('/log-in', logInRouter);


app.use((err, req, res, next) => {
    console.log(err);
})

app.listen(3000, (err) => {
        if (err) {
            throw err;
        };

        console.log("Listening On Port 3000");
    }
);  