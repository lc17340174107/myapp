var express = require('express');
const { systemSend } = require('../common/utils');
const { find, findOne } = require('../mongodb/collection');
var router = express.Router();

// 查询菜单接口
router.get('/vue-admin-template/route/getRoutes', (req, res) => {
    if (req.headers['x-token']) {
        findOne('user', {token: req.headers['x-token']}, (err, result) => {
            if(err) throw err;
            if(result != null) {
                find('route', {}, (err, result) => {
                    if(err) throw err;
                    systemSend(res, result)
                })
            } else {
                res.send({ code: 101, message: "faied token" })
            }
        })
    } else {
        res.send({ code: 101, message: "faied token" })
    }
})

module.exports = router;