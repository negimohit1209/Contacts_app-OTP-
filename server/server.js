var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./DB/mogoose');
var { Todo } = require('./model/Todo');
var { User } = require('./model/User')

var app = express();

app.use(bodyParser.json());

//Routes
/*
POST : /todos
inserts a todo to the database
*/
app.post('/todos', (req, res)=> {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e)=> {
        res.status(400).send(e);
    })
})
/*
GET: /todos
fetches all the todos
*/

app.get('/todos', (req,res)=>{
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (e)=> {
        res.status(400).send({e});
    })    
})

app.listen(3000, ()=> console.log('started on port 3000'));

module.exports = { app }