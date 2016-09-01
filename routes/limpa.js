var express = require('express')
  , router = express.Router();

var limpa = require('../modules/limpa');

router.get('/insert/:ssncam/:numquarto/:dia',limpa.insertOne);

module.exports = router;
