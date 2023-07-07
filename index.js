const express = require('express')
const app = express()
require('dotenv').config()
const port = process?.env?.PORT ||8080
// app.use(json())
// console.log(process)
// console.log(process.env.PORT)
app.use(express.json())
app.use(express.urlencoded({ extended: false, limit: '200mb' }))
const db = require('./src/config/db.config')
const routes = require('./src/routes/index.routes')

db()
routes(app)
app.use('/home', async(req,res)=>{
    return res.send({data:"done"})
})
app.listen(port, (error, data) => {
    console.log(`we are live on port ${port}`)
})