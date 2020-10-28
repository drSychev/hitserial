var express = require('express');
var router = express.Router();
var mainController = require('../controllers/main');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/',mainController.getMedia)
router.get('/page/:id',mainController.getMedia)
router.get('/test',mainController.test)
router.get('/serial/:id',mainController.getSeral)
module.exports = router;
