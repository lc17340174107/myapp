var express = require('express');
const {updateOneById} = require("../mongodb/collection");
const {findOne} = require("../mongodb/collection");
const {insertOne} = require("../mongodb/collection");
const { systemSend } = require('../common/utils');
const { find, findOneById, deleteOneById } = require('../mongodb/collection');
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

// 新增角色接口 （目前只新增了角色  还没有新增菜单的权限）
router.post('/vue-admin-template/role/add', (req, res) => {
    findOne('roles', {role: req.body.role}, (err, result) => {
        if (err) throw err;
        if (result != null) {
            res.send({code: 101, message: '该角色已存在'})
        } else {
            insertOne('roles', {role: req.body.role}, (err, result) => {
                if (err) throw err;
            })
        }
    })
})

// 删除角色接口
router.delete('/vue-admin-template/role/deleteOne', (req, res) => {
    findOneById('roles', req.body._id, (err, result) => {
        if(err) throw err;
        if(result != null) {
            deleteOneById('roles', req.body._id, (err, result) => {
                if(err) throw err;
                systemSend(res, {message: "删除成功"})
            })
        }
    })
})
module.exports = router;
