const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        createIndexes: true
    },
    description: {
        type: String,
        trim: true,
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
