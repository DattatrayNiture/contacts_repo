const contactsModel = require("../model/contact.model")
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const { http_codes, messages, errorStatus } = require('../constant/text.constant');
const { error, success } = require('../common/res.common');
var validator = require("email-validator");
const { isValidobjectId, isValidPhone, isValidZipCode, isValidGender, isValidName, addressLine1, isNameValid } = require('../utils/validator')

const storeCntacts = async (req, res) => {

    try {
        const { email, phoneNumber, contact_id, firstName, lastName, gender, zipCode, line1, line2, country, city } = req.query

        const filters = { _id: new ObjectId(contact_id), is_active: true }
        const updates = {}
        const contactExist = await contactsModel.findOne(filters)
        // what if phonenumber and email want to change
        if (contactExist && isValidobjectId(contact_id)) {

            if (email) {
                if (email && validator.validate(email)) {
                    const newEmailExist = await contactsModel.findOne({ email: email, phoneNumber: contactExist.phoneNumber })
                    if (!newEmailExist) {
                        updates['email'] = email
                    } else {
                        return error(
                            http_codes.badRequest,
                            messages.userWithEmailExist,
                            errorStatus.userWithPhoneExist,
                            res
                        )
                    }

                } else {
                    return error(
                        http_codes.badRequest,
                        messages.inValidEmail,
                        errorStatus.inValidEmail,
                        res
                    )
                }
            }
            if (phoneNumber) {
                if (phoneNumber && isValidPhone(phoneNumber)) {

                    const newPhoneExist = await contactsModel.findOne({ email: contactExist.email, phoneNumber: phoneNumber })
                    console.log(newPhoneExist)
                    if (!newPhoneExist) {
                        updates['phoneNumber'] = phoneNumber
                    } else {
                        return error(
                            http_codes.badRequest,
                            messages.userWithPhoneExist,
                            errorStatus.userWithPhoneExist,
                            res
                        )
                    }
                } else {
                    return error(
                        http_codes.badRequest,
                        messages.inValidPhoneNumber,
                        errorStatus.inValidPhoneNumber,
                        res
                    )
                }
            }
            if (firstName) {
                if (firstName && isValidName(firstName) && isNameValid(firstName)) {
                    updates['firstName'] = firstName
                } else {
                    return error(
                        http_codes.badRequest,
                        messages.inValidFirstName,
                        errorStatus.inValidFirstName,
                        res
                    )
                }
            }
            if (lastName) {
                if (lastName && isValidName(lastName) && isNameValid(lastName)) {
                    updates['lastName'] = lastName
                } else {
                    return error(
                        http_codes.badRequest,
                        messages.inValidLastName,
                        errorStatus.inValidLastName,
                        res
                    )
                }
            }
            if (gender) {
                if (gender && isValidName(gender) && isValidGender(gender)) {
                    updates['gender'] = gender
                } else {
                    return error(
                        http_codes.badRequest,
                        messages.inValidGender,
                        errorStatus.inValidGender,
                        res
                    )
                }
            }
            if (zipCode) {
                if (zipCode && isValidZipCode(zipCode)) {
                    updates['address.zipCode'] = zipCode
                } else {
                    return error(
                        http_codes.badRequest,
                        messages.inValidZipcode,
                        errorStatus.inValidZipcode,
                        res
                    )
                }
            }
            if (city) {
                if (city && isNameValid(city)) {
                    updates['address.city'] = city

                } else {
                    return error(
                        http_codes.badRequest,
                        messages.inValidCity,
                        errorStatus.inValidCity,
                        res
                    )
                }
            }
            if (country) {
                if (country && isNameValid(country)) {
                    updates['address.country'] = country

                } else {
                    return error(
                        http_codes.badRequest,
                        messages.inValidCountry,
                        errorStatus.inValidCountry,
                        res
                    )
                }
            }
            if (line1) {
                if (line1 && addressLine1(line1)) {
                    updates['address.line1'] = line1
                } else {
                    return error(
                        http_codes.badRequest,
                        messages.inValidLine1,
                        errorStatus.inValidLine1,
                        res
                    )
                }
            }
            if (line2) {
                if (line2) {
                    updates['address.line2'] = line2
                }
            }

            const result = await contactsModel.findOneAndUpdate(filters, { $set: updates }, { new: true })

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

module.exports = storeCntacts