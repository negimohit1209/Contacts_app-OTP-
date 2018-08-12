var dotenv = require('dotenv').load();
var env = process.env.NODE_ENV || 'development';
console.log(`****env = ${env}`);
if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/OTP_app';
} else if(env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/OTP_appTest';
}
console.log(`***** Database used:${process.env.MONGODB_URI}`);
