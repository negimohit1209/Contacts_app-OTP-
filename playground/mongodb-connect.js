const { MongoClient, ObjectID }  = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log(`unable to connect to mongodb server`);
    }
    console.log(`Connected to mongodb server`);
    // db.collection('Todos').insertOne({
    //     text: 'Something todo',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log(`Unable to insert todos ${err}`);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: "Mohit",
    //     age: 21,
    //     location: "kolkata"
    // },(err, result) => {
    //     if(err){
    //         return console.log(`Unable to insert todos ${err}`);
    //     }
    //     console.log((result.ops[0]._id.getTimestamp()));
    // })
    db.close();
});