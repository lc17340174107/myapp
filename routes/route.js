var express = require('express');
const { systemSend } = require('../common/utils');
const { find, findOne } = require('../mongodb/collection');
var router = express.Router();

/**
 *菜单编辑相关接口
 *如果该菜单是顶层的菜单，那么它的parentId为0，如果该菜单是某一个顶层菜单的子菜单，那么它的parentId就为顶层菜单的_id 
 * **/

// 查询菜单接口
router.get('/vue-admin-template/route/getRoutes', (req, res) => {
    if (req.headers['x-token']) {
        findOne('user', {token: req.headers['x-token']}, (err, result) => {
            if(err) throw err;
            if(result != null) {
                find('route', {sortObj: {menuId: 1}}, (err, result) => {
                    systemSend(res, result)
                })
            } else {
                res.send({ code: 101, message: "faied token" })
            }
        })
    } else {
        res.send({ code: 101, message: "faied token" })
    }
    
    // if (req.query.token)
})

module.exports = router;