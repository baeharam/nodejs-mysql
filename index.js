var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// db connection from db.js
var db = require('./db');

var sql = 'SELECT * FROM topic';
db.query(sql,function(err, rows, fields){
    console.log(rows);
})