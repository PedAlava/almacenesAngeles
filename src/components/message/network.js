const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const multer = require('multer')
const config = require('../../config')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null,'public/'+ config.filesRoute + '/')
    },
    filename: function (req,file,cb){
        const [name,extension] = file.originalname.split('.')
        
        cb(null,`${name}-${Date.now()}.${extension}`)

    }
})

const upload = multer({storage:storage})


router.get('/', function (req, res) {
    const filterMessages = req.query.user || null
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
    console.log("aqui")
    console.log(req.body)
    res.send("ok")
/*
    controller.addMessage(req.body.usuario, req.body.message,req.file).then((fullMessage) => {
        response.success(req, res, fullMessage, 201)
    }).catch((error) => {
        response.error(req, res, 'Error simulado', 500, 'Es una simulacion de los errores')
    })*/
   

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