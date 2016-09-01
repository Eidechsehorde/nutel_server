var express = require('express')
  , router = express.Router();

var cli = require('../modules/clientes');

router.get('/:cpf/:nome/:telefone/:sexo/:datanasc',cli.insertOne);
//Consultar todos os cliente
router.get('/all',cli.getAll);

module.exports = router;
