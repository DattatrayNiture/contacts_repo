const contactsModel = require("../model/contact.model")
const { http_codes, messages, errorStatus } = require('../constant/text.constant');
var { error, success } = require('../common/res.common');
var validator = require("email-validator");
const { isValidobjectId, isValidPhone, isValidZipCode, isValidGender, isValidName, addressLine1, isNameValid } = require('../utils/validator')


const storeCntacts = async (req, res) => {

    try {

        const { email, phoneNumber, firstName, lastName, gender, zipCode, line1, line2, country, city } = req.query
        const address = {}
        const contactData = {}
        if (firstName && isValidName(firstName) && isNameValid(firstName)) {
            contactData['firstName'] = firstName
        } else {
            return error(
                http_codes.badRequest,
                messages.inValidFirstName,
                errorStatus.inValidFirstName,
                res
            )
        }
        if (lastName && isValidName(lastName) && isNameValid(lastName)) {
            contactData['lastName'] = lastName
        } else {
            return error(
                http_codes.badRequest,
                messages.inValidLastName,
                errorStatus.inValidLastName,
                res
            )
        }
        if (gender && isValidName(gender) && isValidGender(gender)) {
            contactData['gender'] = gender
        } else {
            return error(
                http_codes.badRequest,
                messages.inValidGender,
                errorStatus.inValidGender,
                res
            )
        }
        if (zipCode && isValidZipCode(zipCode)) {
            address['zipCode'] = zipCode
        } else {
            return error(
                http_codes.badRequest,
                messages.inValidZipcode,
                errorStatus.inValidZipcode,
                res
            )
        }
        if (city && isNameValid(city)) {
            address['city'] = city
        } else {
            return error(
                http_codes.badRequest,
                messages.inValidCity,
                errorStatus.inValidCity,
                res
            )
        }
        if (country && isNameValid(country)) {
            address['country'] = country
        } else {
            return error(
                http_codes.badRequest,
                messages.inValidCountry,
                errorStatus.inValidCountry,
                res
            )
        }
        if (line1 && addressLine1(line1)) {
            address['line1'] = line1
        } else {
            return error(
                http_codes.badRequest,
                messages.inValidLine1,
                errorStatus.inValidLine1,
                res
            )
        }
        if (line2) {
            address['line2'] = line2
        }
        if (email && validator.validate(email)) {
            contactData['email'] = email
        } else {
            return error(
                http_codes.badRequest,
                messages.inValidEmail,
                errorStatus.inValidEmail,
                res
            )
        }
        if (phoneNumber && isValidPhone(phoneNumber)) {
            contactData['phoneNumber'] = phoneNumber
        } else {
            return error(
                http_codes.badRequest,
                messages.inValidPhoneNumber,
                errorStatus.inValidPhoneNumber,
                res
            )
        }

        const contactExist = await contactsModel.findOne({ email: email, phoneNumber: phoneNumber })

        if (!contactExist) {
            contactData['address'] = address
            const soreResult = await contactsModel.create(contactData)
            return success(http_codes.created, soreResult, res)
        } else {
            return error(
                http_codes.badRequest,
                messages.userAlreadyExist,
                errorStatus.userAlreadyExist,
                res
            )
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