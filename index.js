'use strict';

const express = require('express');
const cors = require('cors');

const mysql = require('./lib/db');
const bodyParser = require('body-parser');

const modules = {};

modules.users = require('./modules/users');

const app = express();

//DB config/init
var db = false;
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

mysql(process.argv[2]).then(
  function(data){
    db = data;
  }, function(error){
    Log.error(error);
  }
)

//Server req config

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next){
    if(!db)
      return res.json({error: "Error stablishing database connection"});
    // return res.json({success: "Database connected"});
    req.dbEntity = db;
    next();
  });

//ENDPOINTS

//GET
app.get('/users', modules.users.getAll);

app.listen(3000);

console.log("Server running on port 3000");
