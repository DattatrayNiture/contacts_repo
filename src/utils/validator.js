const mongoose = require('mongoose')

const isValidobjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}
const isValidPhone = function (value) {
    if (!(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(value.trim()))) {
        return false
    }
    return true
}
const isValidPinCode = function (value) {
    if (!(/^[1-9]{1}[0-9]{5}$/.test(value.trim()))) {
        return false
    }
    return true
}
const isValidName = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length < 3) return false
    // if (typeof value === 'number' && value.toString().trim().length === 0) return false
    return true;
}
const addressLine1 = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length < 8) return false
    // if (typeof value === 'number' && value.toString().trim().length === 0) return false
    return true;
}
const isValidZipCode = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length > 10) return false
    // if (typeof value === 'number' && value.toString().trim().length === 0) return false
    return true;
}
const isNameValid = function (fname) {
    let isName = /^[A-Za-z ]*$/;
    if (!isName.test(fname)) {
        return false
    } else {
        return true
    }
}
const isValidGender = function(gender){
    return ['MALE', 'FEMALE', 'OTHERS'].includes(gender)
}

module.exports = {
    isValidobjectId,
    isValidPhone,
    isValidGender,
    addressLine1,
    isNameValid,
    isValidPinCode,
    isValidName,
    isValidZipCode,
    addressLine1,
    isNameValid
}