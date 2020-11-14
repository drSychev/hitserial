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
