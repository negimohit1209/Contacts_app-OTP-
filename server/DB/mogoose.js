var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  // bcoz mongoose is not having promise by default
mongoose.connect('mongodb://localhost:27017/TodoApp'); // this is generally the url of the online database

module.exports = {mongoose}