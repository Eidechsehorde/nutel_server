'use strict';

const Log = require('../lib/log');
const md5 = require('md5');

module.exports = {
  camCleanedAllRooms : function(req,res) {
    let query = `select nome_func,ssn_cam_limpa
                  from limpa,funcionario
                  where num_quarto_limpa in (select num_quarto from quarto) and funcionario.ssn_func = limpa.ssn_cam_limpa
                  group by ssn_cam_limpa
                  having count(distinct num_quarto_limpa) = (select count(num_quarto) from quarto);`;
    req.dbEntity.query(query,function(err,result) {
      if(err)
        return res.json(err);
      return res.json(result);
    });
  }
}
