const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const Todo = require('../models/Todo');
const mongoose = require('mongoose');
const {request} = require("express");



//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('Tasks API', () => {
    beforeEach((done) => { //Before each test we empty the database
        Todo.deleteMany({}, (err) => {
            done();
        })
    })
//    Test the GET route
    describe('GET /todo', () => {
        it('should GET all the tasks', (done) => {
            chai.request(server)
                .get("/todo")
                .end((err,res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done();
                });
        });

        it('should NOT GET all the tasks', (done) => {
            chai.request(server)
                .get("/todos")
                .end((err,res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

//    Test the GET (By ID)
    describe('GET /todo/:id', () => {
        it('should GET a task with current ID', (done) => {
            let todo = new Todo({name: 'Buy bread', description: 'blabla', category: 'important', done: false})
            todo.save()
                chai.request(server)
                    .get(`/todo/${todo._id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        // res.body.should.have.property('description')
                        // res.body.should.have.property('name')
                        // res.body.should.have.property('category')
                        // res.body.should.have.property('done')
                        // res.body.should.have.property('_id').eq(todo._id)
                        done()

                    })
        })

    })




//    Test the POST route
    describe('POST /todo', () => {
        it('should POST a new task ', async(done) => {
            let task = {
                name: 'My first task',
                category: 'important',
                description: 'blablabla',
                done: false
            }
            const response = await request
            chai.request(server)
                .post(`/todo`)
                // .send(task)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done()
                })


                // .end((err, res) => {
                //     res.should.have.status(200);
                //     res.body.should.be.a('object');
                //     res.body.should.have.property('name')
                //     res.body.should.have.property('category')
                //     res.body.should.have.property('description')

                // })
        })

    })

//    Test the PUT route
    describe('PUT /todo/:id', () => {
        it('should PUT a task with current ID', (done) => {
            let todo = new Todo({name: 'Buy bread', description: 'blabla', category: 'important', done: false})
            todo.save()
            let taskID = 1;
            let task = {
                name: 'My first task changed',
                description: 'blablabla',
                category: 'important',
                done: false
            }
            chai.request(server)
                .get(`/todo/${todo._id}`)
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('description')
                    res.body.should.have.property('name').eq('Buy bread')
                    res.body.should.have.property('category')
                    res.body.should.have.property('done').eq(false)
                    res.body.should.have.property('_id').eq(todo._id)
                    done()
                })
        })

    })

//    Test the DELETE route 
    
})





