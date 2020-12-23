var MongoClient = require('../db')
var {ObjectId} = require('mongodb')
let collectionName = "serials"
exports.selectMedia = function (countSkip = 0 ,cb) {
  MongoClient.dbo.collection(collectionName).find().project({title:1, _id: 1,link_poster:1, link:1}).skip(countSkip).limit(20).toArray(function (err,res) {
    if(err) {
      throw err
    };
    cb(err,res)
  });
}
exports.findAllSerials = function (limit ,cb) {
  MongoClient.dbo.collection(collectionName).find().project({title:1, _id:1, link:1}).limit(limit).toArray(function (err,res) {
    if(err) {
      throw err
    };
    cb(err,res)
  });
}
exports.findSerialById =function (id,cb) {
  let reqest = [
    {$match:{"_id": new ObjectId(id)}},
    {$project: {
      title: 1,
      title_orig:1,
      description:1,
      link_poster:1,
      premiereWorldCountry:1,
      year:1,
      season_count:1,
      id_CDN:1,
      genres:1,
      tagline:1,
      length: 1,
      content_type:1,
      translations:1,
      iframe_src:1,
      staff: {
        $slice:[{
          $filter:{
            input: '$staff',
            as:'staff',
            cond:{
              $eq:['$$staff.professionKey','ACTOR']}}}, 15]},
              _id: 0}
      }
      ]
  MongoClient.dbo.collection(collectionName).aggregate(reqest).toArray(function (err,res) {
    if(err) {
      throw err
    };
    cb(err,res[0])
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
  MongoClient.dbo.collection(collectionName).find().project({title:1, _id:1}).limit(limit).sort({reiting: -1}).toArray(function (err,docs) {
    if(err) throw err
    cb(docs)
  })

}
//[{$match:{}},{$project: {staff: {$slice:[{$filter:{input: '$staff',as:'staff',cond:{$eq:['$$staff.professionKey','ACTOR']}}}, 30]},_id: 0}}]
