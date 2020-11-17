var MongoClient = require('../db')
var {ObjectId} = require('mongodb')
 exports.addTTLUser = function (idSerial, userIP) {
  MongoClient.dbo.collection('uniqueRating').insertOne({idSerial: idSerial, userIP: userIP, createdAt: new Date()}, function (err,res) {
    if (err) throw err;
  })
}
exports.selectTTLUser = function (idSerial,userIP, cb) {
  MongoClient.dbo.collection('uniqueRating').findOne({idSerial:idSerial, userIP: userIP}, function (err,res) {
      if(err) throw err;
      cb(res)
  })
}
