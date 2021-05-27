const router = require('express').Router();
const Todo = require('../models/Todo');
const JoiSchema = require('../validators/JoiSchema')

router.delete('/todo/:id', async (req, res) => {
    const {id} = req.params;
    const deletedItem = await Todo.findByIdAndDelete(id);
    res.redirect('/todo')

})

module.exports = router
