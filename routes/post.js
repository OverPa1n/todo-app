const router = require('express').Router();
const Todo = require('../models/Todo');
const JoiSchema = require('../validators/JoiSchema')

const categories = ['important', 'unimportant'];

router.post('/todo', async (req, res,next) => {
    try{
    const {err} = JoiSchema(req.body)

    if (err) {
        console.log(err)
        return res.render('error',{err})
    }

        const newTodo = new Todo(req.body);

        await newTodo.save()
        return res.redirect('/todo')
    } catch (e) {
       return next(e)
    }

})

router.post('/todo/:id/completed', async (req, res) => {

    const {id} = req.params;
    await Todo.findById(id).exec()
        .then(result => {
            result.done = !result.done
            return result.save()
        }).then(result => {
            return res.redirect('/todo/completed')
        })

})

module.exports = router
