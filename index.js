const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const connectToDB = require('./models/connect')
const get = require('./routes/get')
const post = require('./routes/post')
const deleteMethod = require('./routes/delete')
const updateMethod = require('./routes/update')

connectToDB()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))



app.use('/', get)
app.use('/', post)
app.use('/', deleteMethod)
app.use('/', updateMethod)


app.all("*", (req, res, next) => {
    throw new Error("Check your routes!");
});
app.use((err, req, res, next) => {
    const isNotFound = ~err.message.indexOf('not found')
    const isCastError = ~err.message.indexOf('Cast to ObjectId failed')
    const isDuplicate = ~err.message.indexOf('duplicate key error collection')
    const fieldRequired = ~err.message.indexOf('Todo validation failed')

    if (err.message && (isNotFound || isCastError)) {
       return res.status(404).render('error', {err})
    }
    if(err.message && (isDuplicate|| fieldRequired)){
       return res.status(412).render('error',{err})
    }
   return res.status(500).render('error', {err})
})



app.listen(3000, () => {
    console.log('LISTENING ON 3000')
})


