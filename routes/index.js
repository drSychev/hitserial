var express = require('express');
var router = express.Router();
var mainController = require('../controllers/main');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/',mainController.getMedia)
router.get('/page/:id',mainController.getMedia)
router.get('/serial/:id',mainController.getSeral)
router.get('/search/',mainController.search)
router.get('/test', function (req,res) {
  res.render('test',{layout: null})
})
module.exports = router;
