var express = require('express');
var router = express.Router();
var dbconn = require('./../' + 'dbconn.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  if (!dbconn.db) {
      dbconn.initDb(function (err) {
      });
  }
  if (dbconn.db) {
      var col = dbconn.db.collection('counts');
      col.insert({ip: req.ip, date: Date.now()});
      col.count(function (err,count) {
          res.render('index', {title: 'Express', pageCount:count, dbInfo: dbconn.dbDetails});
      });
  } else {
      res.render('index',{title: 'Express', pageCount: null});
  }
});

module.exports = router;
