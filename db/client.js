const { Client } = require("pg");

const client = new Client({
    host:       'localhost',
    user:       'maorgo92',
    database:   'members_only',
    password:   '',
    port:       '5432'
});

const populateDb = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS  IDENTITY,
        username VARCHAR ( 255 ),
        password VARCHAR ( 255 ),
        first_name VARCHAR ( 255 ),
        last_name VARCHAR ( 255 ),
        status VARCHAR ( 255 ),
        admin BOOLEAN,
        time TIMESTAMPTZ NOT NULL DEFAULT (CURRENT_TIMESTAMP AT  TIME ZONE 'UTC')
    );

    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        comment TEXT,
        time TIMESTAMPTZ NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')
    );

    INSERT INTO users (username ,first_name ,last_name ,status ,admin)
    VALUES ('mgno1', 'Gordon', 'Ramsey', 'member', true)
;`;

async function main() {
    try {
        console.log('Creating connection...');
        await client.connect()
        console.log('Connection established');
        console.log('Creating users table...');
        await client.query(populateDb);
        console.log('Users table created');
        console.log('Closing connection...');
        await client.end();
        console.log("Connection closed");
    } catch(err) {
        console.error(err);
    };
};

main();