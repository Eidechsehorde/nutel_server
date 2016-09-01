'use strict';

const Log = require('../lib/log');
const md5 = require('md5');

module.exports = {
  insertOne : function(req,res) {
    let query = "insert into limpa value ('ssncam','numquarto','dia')";
    query = query.replace('ssncam',req.params.ssncam).replace('numquarto',req.params.numquarto).replace('dia',req.params.dia);
    console.log('#Limpeza inserida: \n',query,'\n\n');
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    })
  }
}
