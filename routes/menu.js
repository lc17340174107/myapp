var express = require('express');
const {insertOne} = require("../mongodb/collection");
const { systemSend } = require('../common/utils');
var router = express.Router();

// 新增菜单接口
router.post('/vue-admin-template/menu/addOne', (req, res) => {
    if (req.body.title !== undefined) {
        let obj = {
            parentId: req.body.parentId || null,
            path: req.body.path,
            component: req.body.component,
            children: req.body.children || [],
            name: req.body.name || null,
            meta: {
                title: req.body.title,
                icon: req.body.icon || null
            }
        }
        insertOne('route', obj, (err, result) => {
            if (err) throw err
            systemSend(res, '新增成功')
        })
    }
})















module.exports = router;
