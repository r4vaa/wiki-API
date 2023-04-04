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

/////--------------REQUEST TARGETING ALL ARTICLES----------------------/////

app.route('/articles')
    .get(
        function(req, res) {
            Article.find({}).then(function(err,data) {
                if(!err){
                    res.send(data);
                }else{
                    res.send(err);
                }
            });
        }
    )
    .post(
        function(req, res) {
            const newArticle = new Article({
                title : req.body.title,
                content: req.body.content
            })

            newArticle.save()
            .then(function(data){
                res.send('Successfully added a new data');
            }).catch(function(error){
                res.send(error);
            })
        }
    )
    .delete(
        function(req, res){ 
            Article.deleteMany()
            .then(function(data){
                res.send('Successfully deleted all articles')
            })
            .catch((function(err) {
                res.send(err)
            }))
        }
    )

    
/////--------------REQUEST TARGETING SPECIFIC ARTICLES----------------------/////


app.route('/articles/:articleTitle')
    .get(function(req, res) {

        Article.findOne({title: req.params.articleTitle })
        .then(function(foundArticle){
            res.send(foundArticle)
        })
        .catch(function(err){
            res.send('No articles matching that title was found')
        })
    });
    




app.listen(3000, function(){
    console.log("Server started on port 3000")
})