const connection = require('./../connection').connection;

exports.get = (callback) => {
    connection.query('SELECT * FROM produkt_kategorija;', (err, rows) => {
        console.log('The data from produkt_kategorija table: \n', rows);
        callback(err, rows);
    });
}

exports.find = (id, callback) => {
    connection.query('SELECT * FROM produkt_kategorija WHERE id_produkt_kat = ?;',
        [id],
        (err, rows) => {
            console.log('The data from produkt_kategorija table: \n', rows);
            callback(err, rows);
        }
    );
}