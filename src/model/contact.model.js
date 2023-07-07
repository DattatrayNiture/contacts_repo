const mongoose = require('mongoose')
const { Schema } = mongoose;

const eventUserSchema = new Schema({

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    gender: {
        type: String,
        require: true,
        enum: ['MALE', 'FEMALE', 'OTHERS']
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
    },
    phoneNumber: {
        type: Number,
        require: true,
        trim: true,
    },
    address: {
        line1: { type: String, required: true, trim: true },
        line2: { type: String, trim: true, default: "" },
        country: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        zipCode: { type: Number, required: true }
    },
    is_active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Contacts", eventUserSchema);