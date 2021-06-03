const router = require('express').Router();
const Todo = require('../models/Todo');
const JoiSchema = require('../validators/JoiSchema')

router.put('/todo/:id', async (req, res,next) => {
    try {
        const {error} = JoiSchema(req.body)
        if (error) {
            console.log(error)
            return res.render(error.details[0].message)
        }
        const {id} = req.params;
        const updateItem = await Todo.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
        return res.redirect(`/todo/${updateItem._id}`)
    } catch (e) {
        next(e)
    }

})

module.exports = router
