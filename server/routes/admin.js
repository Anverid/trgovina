const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.use((req, res, next) => {
    if (req.session.user.admin) {
        next();
    } else {
        res.status(403).send("Oprosti, nisi administrator!");
    }
});

router.get('/admin_upo', adminController.view_user);
router.get('/narocilo', adminController.view_ord);
router.get('/pregled_nar_adm', adminController.view_ord_adm);


module.exports = router;