const mongoose = require("mongoose");
function connectToDB() {
    mongoose.connect('mongodb://localhost:27017/todosApp', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false , autoIndex: true})
        .then(() => {
            console.log('MONGO CONNECTION')
        }).catch((err) => console.log('OHH NO ERROR', err))
}

module.exports = connectToDB
