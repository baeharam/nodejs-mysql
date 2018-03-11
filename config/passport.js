module.exports = function(app){
	var pbkdf2password = require('pbkdf2-password');
	var hasher = pbkdf2password();
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	var session = require('express-session');
	var MySQLStore = require('express-mysql-session')(session);
	
	// db connection from db.js
	var dbmodule = require('./db');
	var db = dbmodule.dbconnection;
	var db_info = dbmodule.dbinformation;
	
	// session setting
	app.use(session({
		secret: 'aldkfjklj1324^#$#@&&&@',
		resave: false,
		saveUninitialized: true,
		// store data in session table by MySQL
		store: new MySQLStore({
			host:db_info.host,
			port:3306,
			user:db_info.user,
			password:db_info.password,
			database:db_info.database
		})
	}));
	
	// passport setting
	app.use(passport.initialize());
	app.use(passport.session());
	
	// store id into session table
	passport.serializeUser(function(user, done){
		//console.log('serializeUser', user);
		done(null, user.id);
	});

	// after authenticate, read information of user from session table
	passport.deserializeUser(function(id, done){
		//console.log('deserializeUser',id);
		var sql = 'SELECT * FROM user_list WHERE id=?';
		db.query(sql, [id], function(err, users){
			if(err) {
				done('There is no user');
				console.log(err);
			}
			else done(null, users[0]);
		})
	})

	// From authenticate('local')
	passport.use(new LocalStrategy(
		function(username, password, done){
			var id = username;
			var password = password;
			var sql = 'SELECT * FROM user_list WHERE id=?';

			// query to mysql and get data if id is correct
			db.query(sql,[id],function(err, users){
				if(err) {
					console.log(err);	
					return done('There is no user');
				}
				var user = users[0];
				if(!user) return done(null, false);
				// encrypt password and compare with mysql data
				return hasher({password:password, salt:user.salt}, function(err, pass, salt, hash){
					// if correct, succeed!
					if(hash===user.password) done(null, user);
					// if not correct, failed!
					else done(null, false);
				})
			})
		}
	));
	
	return passport;
}