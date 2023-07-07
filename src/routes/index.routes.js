const contacts = require("./contacts.routes")

const routes = (app) => {

    app.use('/api', contacts)

    app.use(async (req, res) => {
        return res.send({ error: "API NOT FOUND" })
    })
}
module.exports = routes