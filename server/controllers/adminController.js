const uporabnik = require('./../models/uporabnik')

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