const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

router.get('/', function (req, res, next) {
    res.render('register');
})

router.post('/',  function (req, res, next) {
    console.log(req.body)

    controller.addUser(req.body.user,req.body.firstname,req.body.lastname,req.body.password).then(
        (fullMessage) => {
        console.log(fullMessage)
        //response.success(req, res, fullMessage, 201)
    }).catch((error) => {
        console.log(error);
        response.error(req, res, 'Error simulado', 500, error)
    })
    res.redirect('/')
    
})


module.exports = router