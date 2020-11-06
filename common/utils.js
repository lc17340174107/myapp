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
    }
};
module.exports = utils;