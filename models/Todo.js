const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        enum: ['important', 'unimportant'],
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;
