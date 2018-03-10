var express = require('express');
var router = express.Router();
var swal = require('sweetalert2');

router.get('/', function(req, res){
    res.render('home/welcome_connect');
})

router.get('/register', function(req, res){
    res.render('home/register_connect');
})

router.get('/delete', function(req, res){
    res.render('home/delete_connect');
})

router.get('/main', function(req,res){
		res.render('home/main_connect');
})

router.post('/register', function(req, res){
	if(!req.body.id && !req.body.password){
		swal('WARNING','You must input both id and password!','error')
	}
	else{
		swal('COMPLETE','You registered your information!','success');
		res.redirect('/');
	}
})

module.exports = router;