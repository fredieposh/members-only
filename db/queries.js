const { Pool } = require("pg");

// const pool = new Pool({
//     host: "localhost",
//     user: "maorgo92",
//     password: '',
//     port: '5432',
//     database: 'members_only'
// });

const pool = new Pool("postgresql://postgres:YReBjGJxBkYFJATYNaLrnDQmcXggHdHj@crossover.proxy.rlwy.net:45061/railway");

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
    const { rows } = await pool.query("SELECT user_id,username, comment, comments.time, comments.id FROM users JOIN comments ON users.id = comments.user_id ORDER BY comments.time DESC;");
    return rows;
};

exports.getMessageById = async function(id) {
    const { rows } = await pool.query("SELECT id FROM comments WHERE id = $1", [id]);
    return rows;
};

exports.deleteMessageById = async function(id) {
    await pool.query("DELETE FROM comments WHERE id = $1", [id]);
};

exports.addMessage = async function(userId, comment) {
    await pool.query(`INSERT INTO comments (user_id, comment) VALUES($1, $2);`, [userId, comment]);
};