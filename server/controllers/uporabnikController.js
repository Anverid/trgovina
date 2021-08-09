const mysql = require('mysql');
const uporabnik = require('./../models/uporabnik')

exports.view = (req, res) => {
    res.render('home');
}

exports.form = (req, res) => {
    res.render('/registriraj_uporabnika');
}

// Add new user
exports.create = (req, res) => {
    const { ime, priimek, email, gesloHash, naslov, pošta, poštna_številka, ime_država
    } = req.body;
    const data = { ime, priimek, email, gesloHash, naslov, pošta, poštna_številka, ime_država };
    // User the connection
    uporabnik.create(data, (err, rows) => {
        if (!err) {
            res.render('validation', { alert: 'User added successfully.' });
        } else {
            console.log(err);
        }
    });
}


// View Users
exports.view = (req, res) => {
    // User the connection
    uporabnik.get((err, rows) => {
        if (!err) {
            //            let removedUser = req.query.removed;
            res.render('admin_upo', { rows, /*removedUser */ });
        } else {
            console.log(err);
        }
    });
}
