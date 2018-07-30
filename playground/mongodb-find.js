const { MongoClient, ObjectID }  = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log(`unable to connect to mongodb server`);
    }
    console.log(`Connected to mongodb server`);

    // db.collection('Todos').find({ 
    //     _id : new ObjectID('5b5cd69e8b6b7e244ca598e8')
    //  }).toArray().then((docs) => {
    //     console.log('Todos')
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log(`Unable to fetch todos ${err}`)
    // });
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`)
    // }, (err) => {
    //     console.log(`Unable to fetch todos ${err}`)
    // });

    db.collection('Users').find({
        name: 'ram'
    }).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err)=> {
        console.log(`Unable to fetch Users ${err}`)
    })
    db.close();
});