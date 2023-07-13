const sessionPool = require('pg').Pool


const pool = new sessionPool({
    user: 'postgres',
    password: 'Quique087',
    host: 'localhost',
    port: '5434',
    database: 'msn'
})
module.exports = pool