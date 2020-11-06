var express = require('express');
const { insertOne, find } = require('../mongodb/collection');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  find("love", {sortObg: {_id: 1}},  (err, result) => {
    if (err) throw err;
    res.send(result);
  })

  // insertOne("love", {name: "Jack Liu", userName: "Jack Liu", password: "123456", title: "嘻嘻嘻", content: "内容在此"},  (err, result) => {
  //   if (err) throw err;
  //   console.log(result);
  // })
});

module.exports = router;
