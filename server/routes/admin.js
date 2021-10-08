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
router.get('/pregled_nar_adm', adminController.view_ord_adm);
router.post('/narocilo_placano', adminController.order_paid);
router.post('/narocilo_odpremljeno', adminController.order_dispatched);
router.post('/espremnica', adminController.espremnica);


module.exports = router;