var express = require('express')
  , router = express.Router();

var limpa = require('../modules/limpa');

router.get('/insert/:ssncam/:numquarto/:dia',limpa.insertOne);

router.get('/all',limpa.getAll);

router.get('/2vezesmesmodia',limpa.roomsCleanedTwo);

router.get('/2vezesmesmodia/ssn',limpa.roomsCleanedTwoSSN);

module.exports = router;
