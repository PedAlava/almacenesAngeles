const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const multer = require('multer')
const config = require('../../config')
const router = express.Router()


router.get('/', function (req, res) {
    //const filterMessages = req.query.user || null
    
    const filterMessages = req.body.usuario || null
    controller.getMessages(filterMessages)
    .then((messageList)=>{
        response.success(req, res,messageList,200)

        console.log(messageList)
    })
    .catch((error)=>{
        response.error(req, res,'Error',500,error)
    })
})

router.patch('/:id', function (req, res){
    controller.updateMessage(req.params.id, res.body.message)
        .then((data)=>{
            response.success(req, res,data,200)
        })
        .catch((error)=>{
            response.error(req, res,'Error interno',500,error)
        })

})

router.post('/', function (req, res) {
    
/**/
    controller.addMessage(req.body.usuario, req.body.friend).then((fullMessage) => {
        response.success(req, res, fullMessage, 201)
    }).catch((error) => {
        response.error(req, res, 'Error simulado', 500, 'Es una simulacion de los errores')
    })
   

})
router.delete('/:id', function(req, res) {
    controller.deleteMessage(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Error interno.', 500, error)
        })
})
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/')
  }


module.exports = router