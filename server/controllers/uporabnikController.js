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
    const { ime, priimek, email, geslo, naslov, pošta, poštna_številka
    } = req.body;
    const data = { ime, priimek, email, geslo, naslov, pošta, poštna_številka, ime_država: "Slovenija" };

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const alert = errors.array()
        console.log(alert)
        res.render('validation', {
            alert,
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

exports.login = (req, res) => {
    const { email, geslo } = req.body;
    const data = { email, geslo };

    uporabnik.checkLogin(data, (err, found, user) => {
        if (!err && found) {
            req.session.loggedIn = true;
            req.session.user = user;
            req.session.user.gesloHash = undefined;
            console.log(`User ${user.ime} logged in!`);
            res.redirect('/');
        } else if (!err && !found) {
            res.render('prijava', { alert: 'Uporabnik ne obstaja ali pa se geslo ne ujema.' });
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
    uporabnik.get((err, rows) => {
        if (!err) {
            console.log(rows)
            res.render('admin_upo', { rows, /*removedUser */ });
        } else {
            console.log(err);
        }
    });
}
