// db connection from db.js
var dbmodule = require('./config/db');
var db = dbmodule.dbconnection;
var db_info = dbmodule.dbinformation;

// get modules
var app = require('./config/setting')();
var passport = require('./config/passport')(app, db, db_info);
var router = require('./routes/route.js')(passport,db,app);
app.use('/', router);

// Port setting
app.listen(3000,function(){
    console.log('port 3000 is connected!');
})