const express = require('express');
const router = express.Router();
const uporabnikController = require('../controllers/uporabnikController');
const { check } = require('express-validator')
const urlencodedParser = express.urlencoded({ extended: false })


router.get('', (req, res) => {
    res.render('home');
});

router.get('', (req, res) => {
    res.render('admin_upo');
});

//routes
router.get('/', uporabnikController.view);
//router.post('/', userController.find);
router.get('/admin_upo', uporabnikController.view);

router.get('/registriraj_uporabnika', uporabnikController.form);
router.post('/registriraj_uporabnika', urlencodedParser, [

    check('ime', 'Ime neprimerno')
        .isLength({ min: 3 })
        .trim(),
    check('priimek', 'Priimek neprimeren')
        .isLength({ min: 3 }),
    check('email', 'Email ni primeren')
        .isEmail()
        .normalizeEmail()
        .exists()
        .trim(),
    check('geslo', 'Geslo ni primerno')
        .isLength({ min: 6 }),
    check('gesloHash', 'Geslo se ne ujema')
        .exists()
        .trim(),
    //   .isHash(str, algorithm) ['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512', 'ripemd128', 'ripemd160', 'tiger128', 'tiger160', 'tiger192', 'crc32', 'crc32b']
    check('naslov', 'Naslov neprimeren')
        .exists()
        .isLength({ min: 3 })
        .trim(),
    check('pošta', 'Pošta ni primerna')

        .trim(),
    check('poštna_številka', 'Poštna številka ni primerna')
        .isNumeric()
        .isLength({ min: 4 })
        .isLength({ min: 4 })
        .trim(),
    check('ime_država', 'Ime Države ni pravo, Vpiši Slovenija')
        //.equals(Slovenija, comparison)
        // .equals(slovenija, comparison)
        .trim(),



], uporabnikController.create);
//router.get('/edituser/:id', userController.edit);
//router.post('/edituser/:id', userController.update);
//router.get('/viewuser/:id', userController.viewall);
//router.get('/deleteuser/:id',userController.delete);



module.exports = router;