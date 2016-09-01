'use strict';

const Log = require('../lib/log');
const md5 = require('md5');

module.exports = {
  getAll : function(req,res){
    let query = "select * from quarto_alugado;"
    req.dbEntity.query(query,function(err,result) {
      if(err)
        return res.json(err);
      return res.json(result);
    })
  },
  insertOne : function(req,res){
    let query = "insert into quarto_alugado (cpf_cli_aluga,ssn_rec_aluga,data_entrada,num_quarto_aluga,qtde_pessoas) value ('param1','param2','param3','param4','param5')";
    query = query.replace('param1',req.params.cpfcli).replace('param2',req.params.ssnrec).replace('param3',req.params.dataent);
    query = query.replace('param4',req.params.numquarto).replace('param5',req.params.qtdpessoas);
    console.log('#Aluguel inserido: \n',query,'\n\n');
    req.dbEntity.query(query,function(err,result) {
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  checkout : function(req,res) {
    let query = "update quarto_alugado set data_saida = 'param3' where num_quarto_aluga = 'param1' and data_entrada = 'param2';";
    query = query.replace('param1',req.params.numquarto).replace('param2',req.params.dataent).replace('param3',req.params.datasaida);
    req.dbEntity.query(query,function(err,result) {
      if(err)
        return res.json(err);
      return res.json(result);
    });
  }
}
