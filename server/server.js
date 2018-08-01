var express = require('express');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./DB/mogoose');
var { Todo } = require('./model/Todo');
var { User } = require('./model/User');

var app = express();
const port  = process.env.PORT || 3000 ;

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
    });
});
/*
GET: /todos
fetches all the todos
*/

app.get('/todos', (req,res)=>{
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (e)=> {
        res.status(400).send({e});
    });    
});

/** 
 * GET /todos/:id
 * fetching individual todos
*/
app.get('/todos/:id', (req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Todo.findById(id).then((todo) => {
        if(!todo)
            return res.status(404).send()
        res.send({todo});
    }).catch((err) => {
        res.status(400).send()
    });
});
app.listen(port, ()=> console.log(`started on port ${port}`));

module.exports = { app };