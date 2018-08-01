var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  // bcoz mongoose is not having promise by default
var databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
mongoose.connect(databaseUrl); // this is generally the url of the online database
console.log(databaseUrl);
module.exports = {mongoose};