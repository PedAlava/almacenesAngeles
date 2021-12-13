const express = require('express')

const router = express.Router()

router.use( express.static('public'))

router.get('/', function (req, res, next) {
    //res.render('forgot-password');
    req.logout();
    res.redirect('/');
})

module.exports = router