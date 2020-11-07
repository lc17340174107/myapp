const express = require('express');
const { systemSend, RandomString } = require('../common/utils');
const { findOne, updateOneById } = require('../mongodb/collection');
const router = express.Router();

// 登录接口
router.post('/vue-admin-template/user/login', (req, res) => {
  findOne("user", { username: req.body.username, password: req.body.password }, (err, result) => {
    if (err) throw err;
    if (result == null) {
      res.send({ code: 101, message: '用户名或密码错误' })
    } else {
      let token = RandomString(32);
      result.token = token
      let obj = {
        $set: { token: token }
      }
      updateOneById("user", result._id, obj, (err, result) => {
        if (err) throw err;
        systemSend(res, { token: token })
      })
    }
  })
})

// 获取用户信息接口
router.get('/vue-admin-template/user/info', (req, res) => {
  findOne("user", { token: req.query.token }, (err, result) => {
    if (err) throw err;
    if (result != null) {
      systemSend(res, result)
    } else {
      res.send({ code: 101, message: "faied token" })
    }
  })
})

// 退出登录接口
router.post('/vue-admin-template/user/logout', (req, res) => {
  findOne("user", { token: req.headers['x-token'] }, (err, result) => {
    if (err) throw err;
    if (result != null) {
      let obj = {
        $set: { token: null }
      }
      updateOneById("user", result._id, obj, (err, result) => {
        if (err) throw err;
        systemSend(res, { data: 'success' })
      })
    } else {
      res.send({ code: 101, message: "failed token" })
    }
  })
})

module.exports = router;
