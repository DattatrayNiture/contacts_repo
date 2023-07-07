const contactsModel = require("../model/contact.model")
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const { http_codes, messages, errorStatus } = require('../constant/text.constant');
var { error, success } = require('../common/res.common');

const deleteContacts = async (req, res) => {

    try {

        const { contact_id } = req.query
        const filters = { _id: new ObjectId(contact_id), is_active: true }
        const updates = {}
        const contactExist = await contactsModel.findOne(filters)

        if (contactExist && isValidobjectId(contact_id)) {

            updates['is_active'] = false

            const result = await contactsModel.findOneAndUpdate(filters, updates, { new: true })

            return success(http_codes.ok, { task: "done", ...result._doc }, res)

        } else {
            return error(
                http_codes.badRequest,
                messages.contactIdRequired,
                errorStatus.contactIdRequired,
                res
            );
        }
    } catch (err) {
        console.log(err);
        return error(
            http_codes.internalError,
            messages.internalServerError,
            errorStatus.internalServerError,
            res
        );
    }

}

module.exports = deleteContacts