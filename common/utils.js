let utils = {
    systemSend(res, data) {
        res.send({
            code: 20000,
            data
        })
    },
    RandomString (length) {
        const chars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        var result = '';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    },
    /**
     * @param arr 需要循环的数据
     * @param _id 每一条数据的uuid
     * @param parentId 父id
     * @param children 子数组
     * **/
    filterRoute (arr, _id, parentId, children) {
        _id = _id || "_id"
        parentId = parentId || "parentId"
        children = children || "children"
        let result = arr.map(parent => {
            arr.filter(child => {
                if (parent[_id] == child[parentId]) {
                    parent[children].push(child)
                    if (child[children] && child[children] !== "") {
                        utils.filterRoute(child[children], _id, parentId, children)
                    }
                } else {
                    return false
                }
            })
            return parent
        })
        return result
    }
};
module.exports = utils;
