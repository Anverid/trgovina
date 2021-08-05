const mysql = require('mysql');

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
            res.render('/registriraj_uporabnika', { alert: 'User added successfully.' });
        } else {
            console.log(err);
        }
    });
}