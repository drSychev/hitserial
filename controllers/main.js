const Model  = require('../models/main')
const Statistics = require('../models/statistics')
const createError = require('http-errors');
function pagination(page,countPages,countItemsForPage){
  if(page<= 2){
    page = 3
  }
  let pagination = []
 for (let  i = 1; i < countPages+1; i++) {

   pagination[i] = +page + i - Math.round(countPages/2)
 }
 pagination[pagination.length] = Math.ceil(Model.allMedia()/countItemsForPage)
 return pagination
}
exports.getMedia = function (req,res,next) {
  let colItemPage = 20
  let page = req.params.id ? req.params.id : 1
  if(Number.isInteger(+page) && page>0){

    let countSkip = page * colItemPage - colItemPage
    Model.selectMedia(countSkip,function (err,media) {
      Model.findAllSerials(500,function (err, serials) {
        Model.selectPopular(5,function (popularSerials) {
          res.render('index',{ data:media, serials: serials,popularSerials:popularSerials, pages: pagination(page,5,colItemPage)})
        })
      })
    })
  }
  else {
    next(createError(404))
  }

}
exports.getSeral = function (req,res,next) {
  // res.json(req.ip)
  let str = req.params.id
  let result = str.match(/[a-z0-9]{24}/g);
  if (result == str) {
    Model.findAllSerials(500,function (err, serials) {
    Model.findSerialById(req.params.id, function (err,serial) {
    Statistics.selectTTLUser(req.params.id, req.ip, function (doc) {
          if (doc == null) {
          Statistics.addTTLUser(req.params.id, req.ip)
          Model.incrementReitingSerialOnSite(req.params.id)
          }
        })
      res.render('item',{serials: serials, serial: serial})
      // res.json({_id:serial,id: req.params.id})
    })
  })
}else{
 next(createError(404))
}
}
exports.getAllSerials = function (req,res) {
}
exports.test = function (req,res) {
  res.json(Model.allMedia())
}
exports.search = function (req, res) {
  Model.findAllSerials(500,function (err,serials) {
    Model.fullTextSearch(req.query.string, function (err, resultSearch) {
      res.render("search", {query: req.query["string"] , serials:serials, resultSearch:resultSearch})
    })
  })

}
