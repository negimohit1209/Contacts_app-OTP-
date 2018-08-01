const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../model/Todo');

const todos = [{
    _id : new ObjectID(),
    text: "test todo 1"
},{
    _id: new ObjectID(),
    text: "test todo 2",
    completed: "true",
    completedAt: 3333
},{
    id: new ObjectID(),
    text: "test todo 3"
}]

beforeEach((done) => {
    Todo.remove( {} ).then(() => {
        Todo.insertMany(todos)
    }).then( () => done())
});

describe('POST /todo', ()=> {
    it('should create a new todo' , (done) => {
        var text = 'test todo text.';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find({text: "test todo text."}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));   
            })
    });

    it('should not create todowith invalid body data', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done();
                }
                Todo.find().then(todos => {
                    expect(todos.length).toBe(3);
                    done();
                }).catch((e) => done(e));
            })
    });
});

describe('GET /todos', () => {
    it('should get all the todos', (done)=> {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(3);
            })
            .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done);
    });
    it('should return a 404 if todo not found' , (done) => {
        var id = new ObjectID();
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    })
    it('should return a 404 if id in not valid' , (done) => {
        var id = '123abs';
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    })
});

describe("DELETE /todos/:id", () => {
    it('should delete a todo', (done) => {
        var hexID = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID)
            })
            .end((err, res) => {
                if(err){
                    return done();
                }
                Todo.findById(hexID).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch(err => done())
            });
    });
    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID();
        request(app)
            .delete(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 if Object id is invalid', (done) => {
        var id = '123abs';
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', ()=>{
    it('should update the todo', (done)=> {
        var hexID = todos[0]._id.toHexString();
        var text = "Testing the patch route";
        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);

    });
    it('should clear completedAt when todo is not completed', (done)=> {
        var hexID = todos[1]._id.toHexString();
        var text = "Testing the patch route 2";
        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                //expect(typeof res.body.todo.completedAt).toBe(null);
            })
            .end(done);
    });
});