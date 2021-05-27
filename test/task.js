const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const Todo = require('../models/Todo');
const mongoose = require('mongoose');



//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('Tasks API', () => {
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
                        // res.body.should.be.a('array');
                        // res.body.should.have.property('name')
                        // res.body.should.have.property('description')
                        // res.body.should.have.property('category')
                        // res.body.should.have.property('done')
                        // res.body.should.have.property('_id')
                        // res.body.should.have.property('__v')
                        done()

                    })



        })

    })




//    Test the POST route

//    Test the PUT route

//    Test the DELETE route 
    
})





