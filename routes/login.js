var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login', {
        error: req.body.error,
        title: "Login do secretário"
    });

});



module.exports = router;