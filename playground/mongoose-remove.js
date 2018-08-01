const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/DB/mogoose');
const { Todo } = require('../server/model/Todo');
const { User } = require('../server/model/User');

//Todo.remove()
// Todo.remove({}).then((res) => {
//     console.log(res);
// })

//Todo.findOneAndRemove();
//Todo.findByIdAndRemove();
Todo.findByIdAndRemove('5b61b5003eabf227bc7faf90').then((doc) => {
    console.log(doc);
})

