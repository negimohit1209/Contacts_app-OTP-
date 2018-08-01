require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./DB/mogoose');
var { Todo } = require('./model/Todo');
var { User } = require('./model/User');

var app = express();
const port  = process.env.PORT;

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

/**
 * DELETE /todos/:id
 * deleting todos by id
*/
app.delete('/todos/:id', (req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo)
            return res.status(404).send()
        res.send({todo});
    }).catch((err) => {
        res.status(400).send();
    });
});

/**
 * UPDATE /todos/:id
 * updating the routes
 */
app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body =  _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch(e => {
        res.status(400).send();
    })
});
app.listen(port, ()=> console.log(`started on port ${port}`));

module.exports = { app };