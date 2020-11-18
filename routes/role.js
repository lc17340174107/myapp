var express = require('express');
const { systemSend } = require('../common/utils');
const { find, findOneById, deleteOneById, updateOneById, findOne, insertOne } = require('../mongodb/collection');
var router = express.Router();


//  后面吧角色表和菜单表通过id关联起来


/**
 * @param arr 需要递归的数组
 * @param children 需要进一步循环的字段
 * @param str 需要添加的数据
 * **/
function recursion (arr, children, str) {

}

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

// 新增角色接口
router.post('/vue-admin-template/role/add', (req, res) => {
    findOne('roles', {role: req.body.role}, (err, result) => {
        if (err) throw err;
        if (result != null) {
            res.send({code: 101, message: '该角色已存在'})
        } else {
            insertOne('roles', {role: req.body.role}, (err, result) => {
                if (err) throw err;
            })
            if (req.body.menus && req.body.menus.length > 0) {
                req.body.menus.map(e => {
                    let obj = {}
                    findOneById('route', e._id, (err, result) => {
                        if (err) throw err;
                        obj = result;
                        obj.meta.roles.push(req.body.role)
                        updateOneById('route', e._id, {$set: obj}, (err, result) => {
                            if (err) throw err
                        })
                    })
                })
            }
            systemSend(res, {message: "新增角色成功"})
        }
    })
})

// 编辑角色接口
router.post('/vue-admin-template/role/updateOne', (req, res) => {
    findOneById('roles', req.body._id, (err, result) => {
        if (err) throw err;
        if (result === null) {
            res.send({code: 101, message: '未查询到角色'})
        } else if (req.body.role !== 'admin') {
            if (req.body.role !== result.role) {
                let obj = result
                obj.role = req.body.role
                updateOneById('roles', req.body._id, {$set: obj}, (e, re) => {
                    if (e) throw e;
                })
            }
            find('route', {}, (er, resu) => {
                if (er) throw er;
                resu.map(e => {
                    let object = e
                    object.meta.roles = e.meta.roles.filter(item => {
                        return item !== result.role
                    })
                    updateOneById('route', e._id, {$set: object}, (err, result) => {
                        if (err) return err;
                    })
                    req.body.menus.map(menu => {
                        if (menu._id == e._id) {
                            object.meta.roles.push(req.body.role)
                            updateOneById('route', e._id, {$set: object}, (err, result) => {
                                if (err) return err;
                            })
                        }
                    })
                })
            })
            systemSend(res, {message: "修改成功"})
        } else {
            res.send({code: 101, message: '不能修改此角色'})
        }
    })
})

// 删除角色接口
router.delete('/vue-admin-template/role/deleteOne', (req, res) => {
    findOneById('roles', req.body._id, (err, result) => {
        if(err) throw err;
        if(result != null) {
            deleteOneById('roles', req.body._id, (err, result1) => {
                if(err) throw err;
                find('route',{}, (err, result2) => {
                    result2.map(e => {
                        let obj = {}
                        obj = e
                        obj.meta.roles = e.meta.roles.filter(role => {
                            return role !== result.role
                        })
                        updateOneById('route', e._id, {$set: obj}, (err, result3) => {
                            if (err) throw err
                        })
                    })
                })
                systemSend(res, {message: "删除成功"})
            })
        }
    })
})
module.exports = router;
