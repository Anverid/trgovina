const bcrypt = require('bcrypt');
const connection = require('./../connection').connection;

const saltRounds = 10;
const extraSalt = process.env.SESSION_SECRET;

exports.create = (data, callback) => {
    const { ime, priimek, email, geslo, naslov, pošta, poštna_številka, ime_država } = data;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            console.log('error while generating salt', err);
            return;
        }
        const slanoGeslo = geslo + extraSalt;
        bcrypt.hash(slanoGeslo, salt, function (err, gesloHash) {
            if (err) {
                console.log('error while hashing', err);
                return;
            }

            connection.query('INSERT INTO uporabnik SET ime = ?, priimek = ?, email = ?, gesloHash = ?, naslov = ?, pošta = ?, poštna_številka = ?, ime_država = ?,admin = FALSE',
                [ime, priimek, email, gesloHash, naslov, pošta, poštna_številka, ime_država],
                (err, rows) => {
                    console.log('The data from user table: \n', rows);
                    callback(err, rows);
                }
            );
        });
    });
}

exports.get = (callback) => {
    connection.query('SELECT * FROM uporabnik ', (err, rows) => {
        console.log('The data from user table: \n', rows);
        callback(err, rows);
    });
}

exports.checkLogin = ({ email, geslo }, callback) => {
    const slanoGeslo = geslo + extraSalt;
    connection.query('SELECT * FROM uporabnik WHERE email = ? LIMIT 1',
        [email],
        (err, rows) => {
            console.log('The data from uporabnik table: \n', rows);

            let found = false;
            if (!err && rows.length > 0) {
                found = true;
                rows = rows[0];

                bcrypt.compare(slanoGeslo, rows.gesloHash, function (err, result) {
                    if (err) {
                        console.log('error while comparing', err);
                        callback(err, found, rows);
                        return;
                    }

                    found = result;
                    callback(err, found, rows);
                });
                return;
            }

            callback(err, found, rows);
        }
    );
}