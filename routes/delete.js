const router = require('express').Router();
const Todo = require('../models/Todo');
const JoiSchema = require('../validators/JoiSchema')

router.delete('/todo/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deletedItem = await Todo.findByIdAndDelete(id);
        return res.redirect('/todo')
    }catch (e) {
        console.log(e)
    }


})

module.exports = router
