const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "maorgo92",
    password: '',
    port: '5432',
    database: 'members_only'
});

exports.getUserNames = async function() {
    const { rows } = pool.query(`SELECT * FROM users;`);
    return rows;
};