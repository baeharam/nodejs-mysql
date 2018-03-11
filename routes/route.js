// router js file for routing pages

// get modules
var express = require('express');
var router = express.Router();
var app = express();
var swal = require('sweetalert2');
var db = require('../config/db').dbconnection;

var passport = require('../config/passport')(app);

// connect "welcome" page by rendering "welcome_connect"
router.get('/', function(req, res){
		// if session of user exists, connect to main page
		if(req.user) res.render('connect/main_connect',{name:req.user.name});
		// else, connect to login page
    else res.render('connect/login_connect');
})

// redirect to "login" page when user clicked logout button
router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
})

// connect "register" page by rendering "register_connect"
router.get('/register', function(req, res){
    res.render('connect/register_connect');
})

// connect "delete" page by rendering "delete_connect"
router.get('/delete', function(req, res){
    res.render('connect/delete_connect');
})

// connect "main" page by rendering "main_connect"
router.get('/main', function(req, res){
		if(req.user && req.user.name)
			res.render('connect/main_connect',{name:req.user.name});
		else
			res.redirect('/');
})


// get id/password when user tried login
// using middleware "authenticate" of passport module
router.post('/login', passport.authenticate('local',{failureRedirect: '/'}), function(req,res){
	var sql = 'SELECT * FROM user_list WHERE id=?';
	db.query(sql,[req.body.username],function(err, nickname){
		if(err){
			res.status(500).send('Internal Server Error');
			console.log(err);
		}
		res.redirect('/main');
	})
})

// get data from register page (id/password)
router.post('/register', function(req, res){
	hasher({password:req.body.password}, function(err, pass, salt, hash){
		var user = {
			id: req.body.username,
			password: hash,
			name: req.body.nickname,
			salt: salt
		};
		var sql = 'INSERT INTO user_list SET ?';
		db.query(sql, user, function(err, register){
			if(err){
      	res.status(500).send('Internal Server Error');
      	console.log(err);
      }
			else res.redirect('/');
		});
	})
});

// delete data from database
router.post('/delete', function(req, res){
	var id = req.body.username;
	var password = req.body.password;
	var sql = 'DELETE FROM user_list WHERE id=?';
	
//	if(id && password){
//		hasher({password:password}, function(err, pass, salt, hash){
//			if()
//		})	
//	}
})


module.exports = router;