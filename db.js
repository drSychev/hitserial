const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
  MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  exports.dbo = db.db("hitserials");
  db.db("hitserials").collection("media").find().toArray(function (err,res) {
    if(err) {
      throw err
    };
    exports.countFilms = res.length;
  });
  var www = require('./bin/www');
});
const settingDB = require('./setting.json').setting.DB;
