'use strict';

const express = require('express');
const cors = require('cors');
const http = require('http');

const mysql = require('./lib/db');
const bodyParser = require('body-parser');

const modules = {};

modules.users = require('./modules/funcionarios');

const app = express();
const server = http.createServer(app);

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

app.get('/func/:ssn/:cpf/:senha/:nome/:rg/:telefone/:sexo/:datanasc/:cargo',function(req,res){
  let query = "insert into `funcionario` values ('ssn','cpf','senha','nome','rg','telefone','sexo','datanasc','cargo');";
  query = query.replace('ssn',req.params.ssn);
  query = query.replace('cpf',req.params.cpf);
  query = query.replace('senha',req.params.senha);
  query = query.replace('nome',req.params.nome);
  query = query.replace('rg',req.params.rg);
  query = query.replace('telefone',req.params.telefone);
  query = query.replace('sexo',req.params.sexo);
  query = query.replace('datanasc',req.params.datanasc);
  query = query.replace('cargo',req.params.cargo);
  console.log(query);
  req.dbEntity.query(query, function(err, result){
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

server.listen(3000,'127.0.0.1',function(){
  server.close(function(){
    server.listen(8002,'192.168.15.102');
  })
});

console.log("Server running on port 3000");
