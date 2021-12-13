const express = require('express')
const router = express.Router()

router.use( express.static('public'))

router.get('/',isAuthenticated, function (req, res, next) {
  
  console.log(req.user._id)
  const id = req.user._id
    res.render('createZone');
})
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/')
  }

module.exports = router