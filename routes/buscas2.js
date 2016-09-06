var express = require('express')
  , router = express.Router();

buscas = require('../modules/buscas2');

router.get('/cam/allrooms',buscas.camCleanedAllRooms);

module.exports = router;
