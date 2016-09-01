var express = require('express')
  , router = express.Router();

var limpa = require('../modules/quartosalugados');
var buscas = require('../modules/buscas');
var quartoalug = require('../modules/quartosalugados');

router.get('/insert/:cpfcli/:ssnrec/:dataent/:numquarto/:qtdpessoas',limpa.insertOne);

router.get('/all',quartoalug.getAll);
//Total gasto por aluguel
router.get('/totalgasto/aluguel',buscas.totalSpentByRent);
//Total gasto por cliente
router.get('/totalgasto/cliente',buscas.totalSpentByClient);
//Total gasto por cliente ordenado por valor
router.get('/totalgasto/cliente/ordenado', buscas.totalSpentByClientOrder);

router.get('/checkout/:numquarto/:dataent/:datasaida', quartoalug.checkout);

module.exports = router;
