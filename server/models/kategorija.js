const connection = require('./../connection').connection;

exports.get = (callback) => {
    connection.query('SELECT * FROM produkt_kategorija;', (err, rows) => {
        console.log('The data from produkt_kategorija table: \n', rows);
        callback(err, rows);
    });
}