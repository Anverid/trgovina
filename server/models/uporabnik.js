const connection = require('./../connection').connection;

exports.create = (data, callback) => {
    const { ime, priimek, email, gesloHash, naslov, pošta, poštna_številka, ime_država
    } = data;
    connection.query('INSERT INTO uporabnik SET ime = ?, priimek = ?, email = ?, gesloHash = ?, naslov = ?, pošta = ?, poštna_številka = ?, ime_država = ?,admin = FALSE',
        [ime, priimek, email, gesloHash, naslov, pošta, poštna_številka, ime_država],
        (err, rows) => {
            console.log('The data from user table: \n', rows);
            callback(err, rows);
        }
    );
}