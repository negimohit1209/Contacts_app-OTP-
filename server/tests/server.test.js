const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../model/Todo');

const todos = [{
    text: "test todo 1"
},{
    text: "test todo 2"
},{
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