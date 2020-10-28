var MongoClient = require('../db')
var {ObjectId} = require('mongodb')
exports.addCategory = function (category,cb) {
  category.dateAdd = Date.now()
  MongoClient.dbo.collection("category").insertOne(category,function (err,res) {
    if(err) {
      throw err
    };
    cb(err,res.ops)
  });
}
exports.selectMedia = function (countSkip = 0 ,cb) {
  MongoClient.dbo.collection("media").find().skip(countSkip).limit(20).toArray(function (err,res) {
    if(err) {
      throw err
    };
    cb(err,res)
  });
}
exports.findAllSerials = function (limit ,cb) {
  MongoClient.dbo.collection("media").find().limit(limit).toArray(function (err,res) {
    if(err) {
      throw err
    };
    cb(err,res)
  });
}
exports.findSerialById =function (id,cb) {
  MongoClient.dbo.collection("media").findOne({_id: new ObjectId(id)},function (err,res) {
    if(err) {
      throw err
    };
    cb(err,res)
  });
}
// exports.allMedia = function (cb) {
//   MongoClient.dbo.collection("media").countDocuments({}).exec(function (err,res) {
//     if(err) {
//       throw err
//     };
//     cb(err,res)
//   });
// }
exports.allMedia = function () {
  return MongoClient.countFilms
}
