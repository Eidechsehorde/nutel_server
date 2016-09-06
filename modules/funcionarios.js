'use strict';

const Log = require('../lib/log');
const md5 = require('md5');

module.exports = {
  insertOne : function(req,res){
    let query = "insert into `funcionario` values ('ssn','cpf','senha','nome','rg','telefone','sexo','datanasc','cargo');";
    let query2 = "update vigia set turno = 'dado' where ssn_vig = 'dado2';";
    query = query.replace('ssn',req.params.ssn);
    query = query.replace('cpf',req.params.cpf);
    query = query.replace('senha',req.params.senha);
    query = query.replace('nome',req.params.nome);
    query = query.replace('rg',req.params.rg);
    query = query.replace('telefone',req.params.telefone);
    query = query.replace('sexo',req.params.sexo);
    query = query.replace('datanasc',req.params.datanasc);
    query = query.replace('cargo',req.params.cargo);
    console.log('#Funcionario inserido: \n',query,'\n\n');
    req.dbEntity.query(query, function(err, result){
      var erro = {};
      if(err)
        return res.json(err);
      if(req.params.cargo === 'vigia'){
            query2 = query2.replace('dado',req.params.turno);
            query2 = query2.replace('dado2',req.params.ssn);
            console.log(query2);
            req.dbEntity.query(query2,function(err,result){
              if(err)
                erro.vigia = err;
              else {
                erro.vigia = result;
              }
            })
      }
      erro.func = result;
      return res.json(erro);
    });
  },
  login : function(req,res){
    let query = "select cpf_func from funcionario where cpf_func = 'cpfs' and senha_func = 'senhas';"
    query = query.replace('cpfs', req.params.cpf);
    query = query.replace('senhas',req.params.senha);
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  getAll : function(req,res){
    let query = "select * from funcionario;"
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  findByName : function(req,res){
    let query = "select * from funcionario where nome_func = 'param1';";
    query = query.replace('param1',req.params.nome);
    req.dbEntity.query(query, function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  findByCPF : function(req,res){
    let query = "select * from funcionario where cpf_func = 'param1';"
    query = query.replace('param1',req.params.cpf);
    console.log(query);
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  findBySSN : function(req,res){
    let query = "select * from funcionario where ssn_func = 'param1';"
    query = query.replace('param1',req.params.ssn);
    console.log(query);
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  findByRG : function(req,res){
    let query = "select * from funcionario where rg_func = 'param1';"
    query = query.replace('param1',req.params.rg);
    console.log(query);
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  findByTelefone : function(req,res){
    let query = "select * from funcionario where telefone = 'param1';"
    query = query.replace('param1',req.params.tel);
    console.log(query);
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  findBySexo : function(req,res){
    let query = "select * from funcionario where sexo_func = 'param1';"
    query = query.replace('param1',req.params.sexo);
    console.log(query);
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  findByData : function(req,res){
    let query = "select * from funcionario where datanasc_func = 'param1';"
    query = query.replace('param1',req.params.datanasc);
    console.log(query);
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  findByCargo : function(req,res){
    let query = "select * from funcionario where cargo_func = 'param1';"
    query = query.replace('param1',req.params.cargo);
    console.log(query);
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  }
}
