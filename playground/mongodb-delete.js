const { MongoClient, ObjectID }  = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log(`unable to connect to mongodb server`);
    }
    console.log(`Connected to mongodb server`);
    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // })
    
    
    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // })
    
    //findOneAndDelete
    // db.collection("Todos").findOneAndDelete({completed: false}).then((res)=>{
    //     console.log(res);
    // })
    
    
    //db.close();
    db.collection('Users').deleteMany({ name: "Mohit"});
    // db.collection("Users").findOneAndDelete({ _id: new ObjectID("5b5cd86c96595a198867ffe7")}).then(res => {
    //     console.log(JSON.stringify(res, undefined, 2));
    // })
});