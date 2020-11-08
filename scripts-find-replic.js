const url = `mongodb://localhost:27017/`;
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url,{useUnifiedTopology: true}, function(err, db) {
  if (err) throw err;
  exports.dbo = db.db("hitserials");
  db.db("hitserials").collection("media").find().sort({title: 1}).toArray(function (err,res) {
    if(err) {
      throw err
    };
    let result = new Array()
    result.push(res[0])
    result[result.length-1].translations = new Array()
    for (var i = 0; i < res.length-1; i++) {
      if(res[i].title == res[i+1].title){
        result[result.length-1].translations.push(res[i].translation)
      }else {
        result.push(res[i+1])
        result[result.length-1].translations = new Array()
        delete result[result.length-1]._id
        delete result[result.length-1].translate

      }
    }
    // console.log(result[result.length-1]);
    db.db("hitserials").collection("hitserialsNew").insertMany(result,function (err,response) {
      if(err) {
        fs.writeFileSync("errlog.json",err)
        throw err
      }
      // console.log(response[0]);
    })
  });
});
