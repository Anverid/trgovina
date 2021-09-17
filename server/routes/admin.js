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

router.get('/admin_upo', adminController.view);




module.exports = router;