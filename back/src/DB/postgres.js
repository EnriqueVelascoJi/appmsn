const sessionPool = require('pg').Pool


const pool = new sessionPool({
    user: 'postgres',
    password: 'yE3$m%aj5UCeT5ca',
    host: 'msn.cvofrq8gjce2.us-east-2.rds.amazonaws.com',
    port: '5434',
    database: 'postgres'
})
module.exports = pool
