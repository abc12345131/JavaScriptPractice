const express = require('express')
const md5 = require('blueimp-md5')




var router = express.Router()

//
router.get('/', function(req, res, next) {
  res.send('<h2>Hi</h2>');
});

module.exports = router;
