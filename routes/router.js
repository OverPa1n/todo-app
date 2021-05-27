const router = require('express').Router();
const Todo = require('../models/Todo');
const JoiSchema = require('../validators/JoiSchema')

const categories = ['important', 'unimportant'];

router.get('/todo', async (req, res, next) => {
    try {
        const listTodo = await Todo.find({});
        console.log(listTodo)
        res.render('index', {listTodo})
    } catch (e) {
        next(e)
    }
})
router.get('/todo/new', (req, res, next) => {
    try {
        res.render('newTodo')
    } catch (e) {
        next(e)
    }
})
router.get('/todo/completed', async (req, res, next) => {
    try {
        const listTodo = await Todo.find({});
        const doneTodo = listTodo.filter(item => item.done === true)
        res.render('completedTodo', {doneTodo})
    } catch (e) {
        next(e)
    }
})
router.get('/todo/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const findItem = await Todo.findById(id);
        res.render('showTodo', {findItem});

    } catch (e) {
        next(e)
    }
})
router.get('/todo/:id/edit', async (req, res, next) => {
    const {id} = req.params;
    try {
        const findItem = await Todo.findById(id)
        res.render('editTodo', {findItem, categories})
    } catch (e) {
        next(e)
    }

})

router.post('/todo', async (req, res) => {
    const {error} = JoiSchema(req.body)
    if (error) {
        console.log(error)
        return res.status(400).send(error.details[0].message)
    }
    const newTodo = new Todo(req.body);
    await newTodo.save()
    res.redirect('/todo')
})

router.post('/todo/:id/completed', async (req, res) => {

    const {id} = req.params;
    await Todo.findById(id).exec()
        .then(result => {
            result.done = !result.done
            return result.save()
        }).then(result => {
            res.redirect('/todo/completed')
        })

})
router.delete('/todo/:id', async (req, res) => {
    const {id} = req.params;
    const deletedItem = await Todo.findByIdAndDelete(id);
    res.redirect('/todo/completed')

})
router.put('/todo/:id', async (req, res) => {
    const {error} = JoiSchema(req.body)
    if (error) {
        console.log(error)
        return res.status(400).send(error.details[0].message)
    }
    const {id} = req.params;
    const updateItem = await Todo.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/todo/${updateItem._id}`)
})


module.exports = router;
