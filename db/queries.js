const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "maorgo92",
    password: '',
    port: '5432',
    database: 'members_only'
});

exports.getUserNames = async function() {
    const { rows } = await pool.query(`SELECT * FROM users;`);
    return rows;
};

exports.getUserByUsername = async function(username) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1;`, [username]);
    return rows;
};

exports.addUser = async function(username, password, firstName, lastName) {
    await pool.query(`
        INSERT INTO users (username, password, first_name, last_name)
        VALUES ($1, $2, $3, $4);
        `, [username, password, firstName, lastName]);
};

exports.getMessages = async function() {
    const { rows } = await pool.query("SELECT * FROM comments;");
    return rows;
};