const http_codes = {
    badRequest: 400,
    internalError: 500,
    created: 201,
    notFound: 404,
    ok: 200,
    forbidden: 403,
    unAuthorized: 401,
    Conflict: 409
}


const messages = {
    internalServerError: "Internal server error",
    contactIdRequired: "contact_id not found",
    inValidEmail: "invalid email address",
    userWithEmailExist: 'user with this email already exist',
    userWithPhoneExist: 'user with phone number already exist',
    inValidFirstName: "first name is invalid please enter name only contain words not number or symbol",
    inValidLastName: "last name is invalid please enter name only contain words not number or symbol",
    inValidPhoneNumber: "invalid phone number",
    inValidGender: "gender is invalid",
    inValidZipcode: "zipcode is invalid",
    inValidCity: "city name is invalid",
    inValidCountry: "country name is invalid",
    inValidLine1: "line1 address is invalid",
    userAlreadyExist: "user with this information already present"
}

const errorStatus = {

    internalServerError: "INTERNAL_SERVER_ERROR",
    inValidLine1: "LINE1 ADDRESS IS INVALID",
    contactIdRequired: " CONTACT_ID NOT FOUND",
    userWithEmailExist: 'user with this email already exist',
    userWithEmailExist: 'USE EMAIL EXIST',
    userWithPhoneExist: 'USER WITH PHONE NUMBER EXIST',
    inValidEmail: "INVALID EMAIL ADDRESS",
    inValidGender: "GENDER IS INVALID",
    inValidZipcode: "ZIPCODE IS INVALID",
    inValidCity: "CITY NAME IS INVALID",
    inValidCountry: "COUNTRY NAME IS INVALID",
    inValidPhoneNumber: "INVALID PHONE NUMBER",
    inValidFirstName: "FIRST NAME IS iINVALID",
    inValidLastName: "LAST NAME IS iINVALID",
    userAlreadyExist: "USER WITH THIS INFORMATION ALREADY PRESENT"


}

const schemas = {

}

module.exports = {
    messages,
    errorStatus,
    schemas,
    http_codes
}