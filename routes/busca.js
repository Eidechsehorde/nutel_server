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

router.get('/cli/todosquartos',buscas.clientsRentAllRooms);

router.get('/cli/1990/todosquartos',buscas.clientsRentAllRoomsYear);

router.get('/cli/todosquartos/matheus',buscas.clientsRentAllRoomsMatheus);

router.get('/gasto/mediacli',buscas.averageSpentByAllClients);

router.get('/cli/maxdias',buscas.clientMaxDays);

module.exports = router;
