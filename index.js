const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
const router = require("./routes/router");

mongoose.connect('mongodb://localhost:27017/todosApp', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log('MONGO CONNECTION')
    }).catch((err) => console.log('OHH NO ERROR', err))


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get("/", (req, res, next) => {
    throw new Error("Check your routes!");
});

app.use('/', router)

app.use((err, req, res, next) => {
    const isNotFound = ~err.message.indexOf('not found')
    const isCastError = ~err.message.indexOf('Cast to ObjectId failed')
    if (err.message && (isNotFound || isCastError)) {
        return next()
    }
    res.status(500).json({error: err.message})
})

app.use((req, res) => {
    res.sendStatus(404)

})


app.listen(3000, () => {
    console.log('LISTENING ON 3000')
})
