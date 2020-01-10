var mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3307',
    password: '123456',
    database: 'mysql'
})

module.exports = con;