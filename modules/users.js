'use strict';

const Log = require('../lib/log');
const md5 = require('md5');

module.exports = {
  getAll : function(req,res){
    req.dbEntity.query(`SELECT * FROM user;`, function(err, result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  }
}
