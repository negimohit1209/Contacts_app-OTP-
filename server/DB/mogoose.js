var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  // bcoz mongoose is not having promise by default
// var databaseUrl = process.env.MONGODB_URI;
var databaseUrl = 'mongodb://negimohit1209:negimohit1209@ds219532.mlab.com:19532/otp-app';
mongoose.connect(databaseUrl); // this is generally the url of the online database
console.log(databaseUrl);
// console.log(process.env.MONGODB_URI);
module.exports = {mongoose};