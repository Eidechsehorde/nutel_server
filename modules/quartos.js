'use strict';

const Log = require('../lib/log');
const md5 = require('md5');

module.exports = {
  insertOne : function(req,res) {
    let query = "insert into quarto value ('num','valor','camas','andar');"
    query = query.replace('num',req.params.num);
    query = query.replace('valor',req.params.valor);
    query = query.replace('camas',req.params.camas);
    query = query.replace('andar',req.params.andar);
    console.log('#Quarto inserido: \n',query,'\n\n');
    req.dbEntity.query(query,function(err,result) {
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  getAll : function(req,res){
    let query = "select * from quarto;"
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  }
}
