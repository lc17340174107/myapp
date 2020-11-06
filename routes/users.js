const { json } = require('express');
var express = require('express');
const { systemSend, RandomString } = require('../common/utils');
const { find, findOne, updateOne, updateOneById } = require('../mongodb/collection');
var router = express.Router();

// 登录接口
router.post('/vue-element-admin/user/login', (req, res) => {
  findOne("user", { username: req.body.username }, (err, result) => {
    if (err) throw err;
    if (req.body.username != result.username) {
      res.send({code: 101, message: '用户名不存在，请联系管理员注册'})
    } else if (req.body.password != result.password) {
      res.send({code: 101, message: '密码错误'})
    }
    if (req.body.username == result.username && req.body.password == result.password) {
      let token = RandomString(32);
      result.token = token
      let obj = {
        $set: {token: token}
      }
      updateOneById("user", result._id, obj, (err, result) => {
        if(err) throw err;
        systemSend(res, {token: token})
      })
    }
  })
})

// 获取用户信息接口
router.get('/vue-element-admin/user/info', (req, res) => {
  findOne("user", { token: req.query.token }, (err, result) => {
    if (err) throw err;
    if (result != null) {
      systemSend(res, result)
    } else {
      res.send({code: 101, message: "faied token"})
    }
  })
})

// 退出登录接口
router.post('/vue-element-admin/user/logout', (req, res) => {
  findOne("user", {token: req.headers['x-token']}, (err, result) => {
    if(err) throw err;
    if (result != null) {
      let obj = {
        $set: {token: null}
      }
      updateOneById("user", result._id, obj, (err, result) => {
        if(err) throw err;
        systemSend(res, {data: 'success'})
      })
    } else {
      res.send({code: 101, message: "failed token"})
    }
  })
})

module.exports = router;
