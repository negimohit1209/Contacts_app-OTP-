var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  // bcoz mongoose is not having promise by default
mongoose.connect('mongodb://localhost:27017/TodoApp'); // this is generally the url of the online database

//create model
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
    },
    completed:{
        type: Boolean,
    },
    completedAt: {
        type: Number,
    }
});

var newTodo = new Todo({
    text: 'eat dinner',
    completed: true,
    completedAt: 123
});

newTodo.save().then((doc) => {
    console.log('Saved todo', doc);
},(e)=>{
    console.log("unable to save todo")
});

