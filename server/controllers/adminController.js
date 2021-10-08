const uporabnik = require('./../models/uporabnik')
const narocilo = require('./../models/narocilo')

// View Users
exports.view_user = (req, res) => {
    uporabnik.get((err, rows) => {
        if (!err) {
            console.log(rows)
            res.render('admin_upo', { rows, /*removedUser */ });
        } else {
            console.log(err);
        }
    });
}
exports.view_ord = (req, res) => {
    narocilo.get((err, rows) => {
        if (!err) {
            console.log(rows)
            res.render('narocilo', { rows, /*removedUser */ });
        } else {
            console.log(err);
        }
    });
}
exports.view_ord_adm = (req, res) => {
    narocilo.get((err, rows) => {
        if (!err) {
            console.log(rows)
            res.render('pregled_nar_adm', { rows, /*removedUser */ });
        } else {
            console.log(err);
        }
    });
}