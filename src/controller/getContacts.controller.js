const contactsModel = require("../model/contact.model")
const mongoose = require('mongoose')
const { http_codes, messages, errorStatus } = require('../constant/text.constant');
var { error, success } = require('../common/res.common');
const ObjectId = mongoose.Types.ObjectId
const { isValidobjectId, isValidPinCode } = require('../utils/validator')
const getContacts = async (req, res) => {

    try {

        var { email, phoneNumber, limit, page, id } = req.query
        limit = limit ? Number(limit) : 10
        var perPage = parseInt(limit) || 10;
        var pages = typeof page != "undefined" ? page == 0 ? 1 : parseInt(page) || 1 : 1;
        var skip = perPage * pages - perPage;

        const pipeline = [{
            $match: {
                is_active: true
            }
        }]

        if (id && isValidobjectId(id)) {
            pipeline.push({
                $match: {
                    _id: new ObjectId(id)
                }
            })
        }

        if (email) {
            pipeline.push({
                $match: {
                    email: { $regex: email, $options: 'i' }
                }
            })
        }

        if (phoneNumber) {
            pipeline.push({
                $match: {
                    phoneNumber: Number(phoneNumber)
                }
            })
        }

        const countPipeline = [...pipeline]
        countPipeline.push({
            $count: "count"
        })

        pipeline.push({
            $skip: skip
        },
            {
                $limit: parseInt(limit)
            })
        const totalCount = await contactsModel.aggregate(countPipeline)
        const result = await contactsModel.aggregate(pipeline)

        var data = {}
        data['list'] = result
        data['current'] = parseInt(pages) || 1;
        data['pages'] = Math.ceil((totalCount[0]?.count || 0) / perPage);
        data['total_documents'] = totalCount[0]?.count || 0

        return success(http_codes.ok, data, res)

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

module.exports = getContacts