var express = require('express');
var router = express.Router();



router.get('/', function(req,res,next){
    res.status(200).render('noticias',{
        
    })
});





module.exports = router;