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
  },
  getAll : function(req,res) {
    let query = "select * from limpa";
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    })
  },
  roomsCleanedTwo : function(req,res) {
    let query = `select nquarto as num_quarto,date_format(dia,'%d/%m/%Y') as datalimp,qtde as Quantidade
                  from (select count(*) as qtde, num_quarto_limpa as nquarto,dia,ssn_cam_limpa from limpa group by num_quarto_limpa,dia) as a
                  where qtde >= 2;`;
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    })
  },
  roomsCleanedTwoSSN : function(req,res) {
    let query = `select ssn_cam_limpa, date_format(limpa.dia,'%d/%m/%Y') as datalimp, num_quarto_limpa
                  from limpa,(select nquarto,dia
                        			from (select count(*) as qtde, num_quarto_limpa as nquarto,dia,ssn_cam_limpa from limpa group by num_quarto_limpa,dia) as a
                        			where qtde >= 2) as B
                  where num_quarto_limpa = nquarto and B.dia = limpa.dia;`;
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    })
  },
}
