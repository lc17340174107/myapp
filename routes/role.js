var express = require('express');
const { systemSend } = require('../common/utils');
const { find, findOne } = require('../mongodb/collection');
var router = express.Router();

// 查询权限用户列表接口
router.get('/vue-admin-template/role/list', (req, res) => {
    let regPos = /^[0-9]*[1-9][0-9]*$/; //正整数
    if (regPos.test(req.query.page) && regPos.test(req.query.limit)) {
        find('roles', {limit: parseInt(req.query.limit), skip: (parseInt(req.query.limit) * (req.query.page - 1))}, (err, result) => {
            if(err) throw err;
            systemSend(res, result)
        })
    } else {
        res.send({code: 101, message: "分页参数错误"})
    }
})

module.exports = router;