const { Client } = require("pg");
const bcrypt = require("bcryptjs");

// const client = new Client({
//     host:       'localhost',
//     user:       'maorgo92',
//     database:   'members_only',
//     password:   '',
//     port:       '5432'
// });

const client = new Client('postgresql://postgres:YReBjGJxBkYFJATYNaLrnDQmcXggHdHj@crossover.proxy.rlwy.net:45061/railway');

async function createAdminPassword(password){
    const cryptedPassword = await bcrypt.hash(password, 10);
    return cryptedPassword;
};

const populateDb = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS  IDENTITY,
        username VARCHAR ( 255 ),
        password VARCHAR ( 255 ),
        first_name VARCHAR ( 255 ),
        last_name VARCHAR ( 255 ),
        status BOOLEAN NOT NULL DEFAULT true,
        admin BOOLEAN NOT NULL DEFAULT false,
        time TIMESTAMPTZ NOT NULL DEFAULT (CURRENT_TIMESTAMP AT  TIME ZONE 'UTC')
    );

    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        comment TEXT,
        time TIMESTAMPTZ NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')
    );`;

async function main() {
    try {
        console.log('Creating connection...');
        await client.connect()
        console.log('Connection established');
        console.log('Crypting admin password');
        const password = await createAdminPassword('12345678');
        console.log('Password crypted');
        console.log('Creating users table...');
        await client.query(populateDb);
        console.log('Users table created');
        console.log('Adding admin');
        await client.query(`
            INSERT INTO users (username, password ,first_name ,last_name ,status ,admin)
            VALUES ('mgno1',$1 ,'Gordon', 'Ramsey', true, true);`
        ,[password]);
        console.log('Admin added');
        console.log('Adding first comment');
        await client.query(`
            INSERT INTO comments (user_id ,comment)
            VALUES (1, 'Welcome to Message Board!');`);
        console.log('First comment added');
        console.log('Closing connection...');
        await client.end();
        console.log("Connection closed");
    } catch(err) {
        console.error(err);
    };
};

main();