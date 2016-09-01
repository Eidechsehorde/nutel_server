var express = require('express')
  , router = express.Router();

buscas = require('../modules/buscas');

router.get('/:query',function(req,res){
  let query = req.params.query;

  req.dbEntity.query(query,function(err,result) {
    if(err)
      return res.json(err);
    return res.json(result);
  })
});

router.get('/niver/marco',buscas.allEmployeesMarchBirth);

router.get('/gasto/poraluguel',buscas.totalSpentByRent);

router.get('/gasto/porcliente',buscas.totalSpentByClient);

router.get('/gasto/porclienteorder',buscas.totalSpentByClientOrder);

router.get('/gasto/clienteporano',buscas.totalSpentByClientPerYear);

router.get('/lucro/porano',buscas.totalProfitByYear);

module.exports = router;
