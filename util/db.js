const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'loginAuthentication',
})

con.connect(function (err, conn) {
    if (err) return console.error(err);
    return console.log('connected mysql');
})

module.exports = con;