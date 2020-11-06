let utils = {
    systemSend(res, data) {
        res.send({
            code: 20000,
            data
        })
    }
};
module.exports = utils;