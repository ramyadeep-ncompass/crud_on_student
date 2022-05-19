// get the client
const mysql = require('mysql2');

// create the connection to database
module.exports.mySqlConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usecase2'
});