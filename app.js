const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/wikiDB', {useNewUrlParser : true});


app.set('view engine', ejs);

app.use(bodyParser.urlencoded({extended:  true}));
app.use(express.static('public'));

const articleSchema = new mongoose.Schema({
    title: String,
    content : String
})

const Article = mongoose.model('Article', articleSchema);


app.get('/articles', function(req, res) {
    Article.find({}).then(data => {
        res.send(data)
    });
})



app.listen(3000, function(){
    console.log("Server started on port 3000")
})