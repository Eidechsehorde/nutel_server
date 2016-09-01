var express = require('express')
  , router = express.Router();

var funcionario = require('../modules/funcionarios');

router.get('/all',funcionario.getAll);
//Inserir novo func
router.get('/:ssn/:cpf/:senha/:nome/:rg/:telefone/:sexo/:datanasc/:cargo/:turno',funcionario.insertOne);
//Consultar um funcionário
router.get('/login/:cpf/:senha',funcionario.login);
//Consulta pelo nome do funcionario
router.get('/:nome',funcionario.findByName);
//Consulta pelo cpf do funcionario
router.get('/bycpf/:cpf',funcionario.findByCPF);
//Consulta pelo ssn do funcionario
router.get('/byssn/:ssn',funcionario.findBySSN);
//Consulta pelo rg do funcionario
router.get('/byrg/:rg',funcionario.findByRG);
//Consulta pelo telefone do funcionario
router.get('/bytel/:tel',funcionario.findByTelefone);
//Consulta pelo sexo do funcionario
router.get('/bysexo/:sexo',funcionario.findBySexo);
//Consulta pela Data de nasc do funcionario
router.get('/bydata/:datanasc',funcionario.findByData);
//Consulta pelo cargo do funcionario
router.get('/bycargo/:cargo',funcionario.findByCargo);

module.exports = router;
