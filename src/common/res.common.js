function success(code, data, res) {
    return res.status(code).json({ data: data })
}

function error(code, msg, status, res, extra) {
    let obj = {
        error: {
            msg, 
            status,
            // extra
        }
    }
    console.error(obj);
    return res.status(code).json(obj)
}

module.exports = {
    success,
    error
}