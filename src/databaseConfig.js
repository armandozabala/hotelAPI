const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'armando22',
    database: 'hotels_db'
});

mysqlConnection.connect(function(err) {

    if (err) {
        console.log(err);
        return;
    } else {
        console.log('DB is connected');
    }

});


module.exports = mysqlConnection;