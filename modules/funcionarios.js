'use strict';

const Log = require('../lib/log');
const md5 = require('md5');

module.exports = {
  getAll : function(req,res){
    req.dbEntity.query(`INSERT INTO funcionario value ('236.62897.20-9','386.845.018-10','19937272','Augusto Lima Conte','37.524.378-1','(11)99254-3306','masculino','1993-04-21','vigia')`, function(err, result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  }
}
