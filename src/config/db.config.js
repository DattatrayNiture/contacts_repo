const { connect } = require('mongoose');
require('dotenv').config()
const db  = async () => {
    try {
        var dbURL = process.env.DB_LOCAL_URL

        await connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("mongodb database connected successfully");
    } catch (error) {
        console.log("database not connected", error);
    }
}
module.exports = db