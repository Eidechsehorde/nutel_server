'use strict';

const Log = require('../lib/log');
const md5 = require('md5');

module.exports = {
  insertOne : function(req,res) {
    let query = "insert into cliente value ('cpf','nome','tel','sex','data');";
    query = query.replace('cpf',req.params.cpf);
    query = query.replace('nome',req.params.nome);
    query = query.replace('tel',req.params.telefone);
    query = query.replace('sex',req.params.sexo);
    query = query.replace('data',req.params.datanasc);
    console.log('#Cliente inserido: \n',query,'\n\n');
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  getAll : function(req,res){
    let query = "select * from cliente;"
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  }
}
