const connection = require('./../connection').connection;
const _ = require('lodash')
const dayjs = require('dayjs')

exports.get = (callback) => {
    const query = `
        SELECT * FROM narocila
        JOIN narocila_izdelki ON narocila.id = narocila_izdelki.id_narocilo
        JOIN produkt ON narocila_izdelki.id_izdelek = produkt.id
        JOIN uporabnik ON narocila.id_narocnik = uporabnik.id
        ORDER BY narocila.datum_narocila DESC, narocila.id DESC
    `;
    connection.query(query, (err, rows) => {
        if (err) {
            console.log('Error while getting narocilo!', err);
            callback(err, row);
            return;
        }
        const grouped = _.groupBy(rows, 'id_narocilo');
        let array = _.toArray(grouped).map(narocilo => {
            // narocilo = array vrstic - id_narocilo, ime, priimek, cena..., izdelek_id, kolicina, izdelek ime...
            let data = _.clone(narocilo[0]);
            data.izdelki = [];
            for (vrstica of narocilo) {
                data.izdelki.push({
                    id: vrstica.id_izdelek,
                    ime: vrstica.ime_produkta,
                    kolicina: vrstica.kolicina,
                });
            }

            data.datum_narocila_str = dayjs(data.datum_narocila).format('DD. MM. YYYY');
            data.datum_placila_str = data.datum_placila ? dayjs(data.datum_placila).format('DD. MM. YYYY') : "Še ni plačano";
            data.datum_odprema_str = data.datum_odprema ? dayjs(data.datum_odprema).format('DD. MM. YYYY') : "Še ni odpremljeno";
            return data;
        });
        array = array.sort((narocilo1, narocilo2) => {
            if (narocilo1.datum_narocila < narocilo2.datum_narocila) {
                return 1;
            } else if (narocilo1.datum_narocila == narocilo2.datum_narocila) {
                return narocilo1.id_narocilo < narocilo2.id_narocilo ? 1 : -1;
            } else {
                return -1;
            }
        });



        console.log('The data from narocila table: \n', array);
        callback(err, array);
    });
}

exports.create = (data, callback) => {
    const { id_narocnik, cena, kosarica } = data;
    // 1. Naredi vnos v tabeli narocila --> rabiva ceno naročila
    connection.query('INSERT INTO narocila SET id_narocnik = ?, cena = ?, datum_narocila = CURRENT_DATE()',
        [id_narocnik, cena],
        (err, row) => {
            if (err) {
                console.log('Error while creating narocilo!', err);
                callback(err, row);
                return;
            }

            console.log('The data from narocila table: \n', row);
            const id_narocilo = row.insertId;

            // 2. Naredi vnose v tabeli narocila_izdelki za vsak izdelek/kolicino
            let izdelki_vnosi = [];
            for (izdelek of kosarica) {
                izdelki_vnosi.push([id_narocilo, izdelek.izdelek_id, izdelek.kolicina]);
            }
            connection.query('INSERT INTO narocila_izdelki (id_narocilo, id_izdelek, kolicina) VALUES ?',
                [izdelki_vnosi],
                (err, rows) => {
                    console.log('The data from narocila_izdelki table: \n', rows);
                    callback(err, rows);
                }
            );

        }
    );
}

exports.markPaid = (id, callback) => {
    connection.query('UPDATE narocila SET datum_placila = CURRENT_DATE() WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.log('Error while updating narocilo!', err);
            callback(err, row);
            return;
        }
        callback(err, row);
    });
}

exports.markDispatched = (id, callback) => {
    connection.query('UPDATE narocila SET datum_odprema = CURRENT_DATE() WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.log('Error while updating narocilo!', err);
            callback(err, row);
            return;
        }
        callback(err, row);
    });
}