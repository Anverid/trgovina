const express = require('express');
const router = express.Router();
const izdelekController = require('../controllers/izdelekController');


router.get('', (req, res) => {
    res.render('home');
});


router.get('/', izdelekController.view);

module.exports = router;