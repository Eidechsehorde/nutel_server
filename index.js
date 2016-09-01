'use strict';

const express = require('express');
const cors = require('cors');
const http = require('http');

const mysql = require('./lib/db');
const bodyParser = require('body-parser');

const modules = {};

modules.func = require('./modules/funcionarios');
modules.cli = require('./modules/clientes');
modules.quar = require('./modules/quartos');
modules.buscas = require('./modules/buscas');

const rotas = {};

rotas.funcionario = require('./routes/funcionario');
rotas.busca = require('./routes/busca');
rotas.limpa = require('./routes/limpa');
rotas.quartoalugado = require('./routes/quartoalugado');
rotas.cliente = require('./routes/cliente');

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
app.use(rotas.funcionario);
app.use(function(req,res,next){
    if(!db)
      return res.json({error: "Error stablishing database connection"});
    // return res.json({success: "Database connected"});
    req.dbEntity = db;
    next();
  });

//ENDPOINTS

//ROTAS
app.use('/func',rotas.funcionario);
app.use('/busca',rotas.busca);
app.use('/limpa',rotas.limpa);
app.use('/quartoalugado',rotas.quartoalugado);
app.use('/cli',rotas.cliente);

//GET
//FUNCIONARIO
//Consultar todos os func
app.get('/',function(req,res) {
  res.json("Welcome to Nutel API");
});

//Todos os recepcionistas homens
app.get('/recepcionistas/homens',modules.buscas.allMaleHostess);
//Todos os recepcionistas mulheres
app.get('/recepcionistas/mulheres',modules.buscas.allFemaleHostess);
//Todos os vigias noturnos
app.get('/vigias/noturno',modules.buscas.allNightWatchman);
//Todos os func aniversariantes do mes 3
app.get('/marconiver',modules.buscas.allEmployeesMarchBirth);

//QUARTO
//Inserir quarto
app.get('/quarto/:num/:valor/:camas/:andar',modules.quar.insertOne);
//Consultar todos os quartos
app.get('/quarto/all',modules.quar.getAll);

//QUARTO ALUGADO
//Total gasto por cliente especifico por Ano
app.get('/analitycs/lucro/cliente/:nome',modules.buscas.totalSpentByClientPerYear);
//Total de lucro por Ano
app.get('/analitycs/profit/year',modules.buscas.totalProfitByYear);

server.listen(3000,'127.0.0.1');

console.log("Server running on port 3000");
