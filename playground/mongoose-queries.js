const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/DB/mogoose');
const { Todo } = require('../server/model/Todo');
const { User } = require('../server/model/User');


var id = '5b5f20eaf4ebec05fc43d7301';

// if(!ObjectID.isValid(id)){
//     console.log('id not valid');
// }


// Todo.find({_id: id}).then(docs => {
//     console.log(docs);
// })

// Todo.findOne({_id: id}).then((todo) => {
//     console.log(todo);
// })

// Todo.findById(id).then((todo)=>{
//     if(!todo)
//         return console.log(`Id not found`);
//     console.log(todo);
// }).catch((e) => console.log(e))

id = '5b5eec509392501fb41647a1';
User.findById(id).then((user) => {
    if(!user)
        return console.log(`Sorry no user found`);
    console.log(`Email id: ${user.email}`)
}).catch((err) => {
    console.log(err);
})

