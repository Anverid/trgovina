const iconv = require('iconv-lite');

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

exports.order_paid = (req, res) => {
    console.log("PLAČANO - ID JE ", req.body.id);
    narocilo.markPaid(req.body.id, (err, rows) => {
        if (!err) {
            console.log(rows)
            res.redirect('/admin/pregled_nar_adm');
        } else {
            console.log(err);
        }
    })
}

exports.order_dispatched = (req, res) => {
    console.log("ODPREMLJENO - ID JE ", req.body.id);
    narocilo.markDispatched(req.body.id, (err, rows) => {
        if (!err) {
            console.log(rows)
            res.redirect('/admin/pregled_nar_adm');
        } else {
            console.log(err);
        }
    })
}

exports.espremnica = (req, res) => {
    narocilo.get((err, rows) => {
        if (err) {
            console.log(err);
            return;
        }

        // ne-odpremljena narocila
        let narocila = [];
        for (let narocilo of rows) {
            if (!narocilo.datum_odprema) {
                narocila.push(narocilo);
            }
        }

        let s = "";
        for (let narocilo of narocila) {
            s += 401; // Vrsta pošiljke
            s += ';' + "ĆPŠĐŽ"; // Črtna koda
            s += ';' + narocilo.ime + " " + narocilo.priimek; // Naziv
            s += ';'; // Dodaten naziv
            s += ';' + narocilo.naslov; // Naslov
            s += ';' + narocilo.poštna_številka; // PoštnaŠtevilka
            s += ';' + narocilo.pošta; // Pošta
            s += ';' + 705; // Država
            s += ';'; // TelŠt
            s += ';' + narocilo.email; // Email
            s += ';'; // IdNas
            s += ';'; // Opomba
            s += ';'; // Masa
            s += ';'; // DodatneStoritve
            s += ';'; // Odkupnina
            s += ';'; // Vrednost
            s += ';'; // VrstaVplDok
            s += ';'; // RefX
            s += ';'; // Model
            s += ';'; // Sklic
            s += ';'; // Namen
            s += ';'; // OdkvValuti
            s += ';'; // Valuta
            s += ';'; // Navodilo
            s += '\n';
        }

        // res.attachment('izvoz-espremnica.csv');
        // let buf = Buffer.from(s, 'windows-1250');
        // res.set({ 'content-type': 'text/csv; charset=windows-1250' });
        // res.send(s);

        let buf = iconv.encode(s, 'win1250');
        res.writeHeader(200, {
            'Content-Type': 'text/csv; charset=windows-1250',
            'Content-Disposition': 'attachment; filename="izvoz-espremnica.csv"'
        });
        res.write(buf);
        res.end();
    });



}
