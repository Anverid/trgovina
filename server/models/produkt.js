const connection = require('./../connection').connection;







exports.get = (callback) => {
    connection.query('SELECT * FROM produkt ', (err, rows) => {
        console.log('The data from user table: \n', rows);
        callback(err, rows);
    });
}