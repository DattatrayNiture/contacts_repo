const { Router } = require("express");
const router = Router()
const storeCntacts = require('../controller/storeContacts.controller')
const getContacts = require('../controller/getContacts.controller')
const updatesContacts = require('../controller/updatesContacts.controller')
const deleteContacts = require('../controller/deleteContacts.controller')
router.post('/contact', storeCntacts)
router.get('/contact', getContacts)
router.put('/contact', updatesContacts)
router.delete('/contact', deleteContacts)

module.exports = router