var MongoClient = require('../db')
var {ObjectId} = require('mongodb')
let collectionName = "hitserialsNew"
exports.selectMedia = function (countSkip = 0 ,cb) {
  MongoClient.dbo.collection(collectionName).find().skip(countSkip).limit(20).toArray(function (err,res) {
    if(err) {
      throw err
    };
    cb(err,res)
  });
}
exports.findAllSerials = function (limit ,cb) {
  MongoClient.dbo.collection(collectionName).find().limit(limit).toArray(function (err,res) {
    if(err) {
      throw err
    };
    cb(err,res)
  });
}
exports.findSerialById =function (id,cb) {
  MongoClient.dbo.collection(collectionName).findOne({_id: new ObjectId(id)},function (err,res) {
    if(err) {
      throw err
    };
    cb(err,res)
  });
}
exports.fullTextSearch = function (stringSearch, cb) {
  MongoClient.dbo.collection(collectionName).find({$text: { $search: stringSearch }}).toArray(function (err,res) {
    if(err) {
      throw err
    };
    cb(err,res)
  });
}
exports.allMedia = function () {
  return MongoClient.countFilms
}
exports.incrementReitingSerialOnSite = function(idSerial){
  MongoClient.dbo.collection(collectionName).updateOne({_id: new ObjectId(idSerial)}, {$inc: {reiting: 1}},function (err) {
    if(err) throw err
  })
}
exports.selectPopular = function (limit,cb) {
  MongoClient.dbo.collection(collectionName).find().limit(limit).sort({reiting: -1}).toArray(function (err,docs) {
    if(err) throw err
    cb(docs)
  })

}
