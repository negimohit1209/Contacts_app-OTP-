var mongoose = require('mongoose');

var User = mongoose.model('User', {
    firstName:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    areaCode:{
        type: Number,
        required: true,
        trim: true,
        minlength: 1
    },
    phoneNo:{
        type: Number,
        required: true,
        trim: true,
        minlength: 10
    },
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    city:{
        type: String,
        trim: true,
        minlength: 1
    },
    country:{
        type: String,
        trim: true,
        minlength: 1
    }
})

module.exports = {
    User
}