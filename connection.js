const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'r$$100200',
    database:'crudmysql',
});

connection.connect((err) => {
    if(err){
        console.log(err.message);
    } else {
        console.log('Database Connected Successfully...');
    }
});

module.exports = connection;