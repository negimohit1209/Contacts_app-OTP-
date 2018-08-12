var mongoose = require('mongoose');

var Message = mongoose.model('Message', {
    sid:{
        type: String,
        required: true
    },
    dateCreated:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    sender:{
        type: String,
        required: true
    }
});

module.exports = {
    Message
}