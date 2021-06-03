const router = require('express').Router();
const Todo = require('../models/Todo');
const JoiSchema = require('../validators/JoiSchema')

const categories = ['important', 'unimportant'];

router.get('/todo', async (req, res, next) => {
    try {
        const listTodo = await Todo.find({});
        console.log(listTodo)
        return res.render('index', {listTodo})
    } catch (e) {
        next(e)
    }
})
router.get('/todo/new', (req, res, next) => {
    try {
        return res.render('newTodo')
    } catch (e) {
        next(e)
    }
})
router.get('/todo/completed', async (req, res, next) => {
    try {
        const listTodo = await Todo.find({});
        const doneTodo = listTodo.filter(item => item.done === true)
        return res.render('completedTodo', {doneTodo})
    } catch (e) {
        next(e)
    }
})
router.get('/todo/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const findItem = await Todo.findById(id);
        return res.render('showTodo', {findItem});

    } catch (e) {
        next(e)
    }
})
router.get('/todo/:id/edit', async (req, res, next) => {
    const {id} = req.params;
    try {
        const findItem = await Todo.findById(id)
        return res.render('editTodo', {findItem, categories})
    } catch (e) {
        next(e)
    }

})

module.exports = router
