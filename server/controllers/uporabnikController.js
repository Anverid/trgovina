const mysql = require('mysql');
const uporabnik = require('./../models/uporabnik')
const { validationResult } = require('express-validator')

exports.view = (req, res) => {
    res.render('home');
}

exports.form = (req, res) => {
    res.render('/registriraj_uporabnika');
}

// Add new user
exports.create = (req, res) => {
    const { ime, priimek, email, gesloHash, naslov, pošta, poštna_številka
    } = req.body;
    const data = { ime, priimek, email, gesloHash, naslov, pošta, poštna_številka, ime_država: "Slovenija" };
    // User the connection
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        //       return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        console.log(alert)
        res.render('validation', {
            alert
        })
        return;
    }
    uporabnik.create(data, (err, rows) => {
        if (!err) {
            res.render('validation', { alert: [{ msg: 'Uspešna registracija.' }] });
        } else {
            console.log(err);
            if (err.code == "ER_DUP_ENTRY") {
                res.render('validation', { alert: [{ msg: 'Ta email že obstaja.' }] });

            }
        }
    });
}



// View Users
exports.view = (req, res) => {
    // User the connection
    uporabnik.get((err, rows) => {
        if (!err) {
            console.log(rows)
            res.render('admin_upo', { rows, /*removedUser */ });
        } else {
            console.log(err);
        }
    });
}
