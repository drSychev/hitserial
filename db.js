const MongoClient = require('mongodb').MongoClient;
const settingDB = require('./setting.json').setting.DB;
const url = `mongodb://${settingDB.ip}:27017/`;
  MongoClient.connect(url,{   auth: {username:  settingDB.login, password: settingDB.password},
  authSource:'admin',useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  exports.dbo = db.db("hitserials");
  db.db("hitserials").collection("hitserialsNew").createIndex({"title": "text"}, {"description": "text"})
  db.db("hitserials").collection("hitserialsNew").find().toArray(function (err,res) {
    if(err) {
      throw err
    };
    exports.countFilms = res.length;
  });
  var www = require('./bin/www');
});
