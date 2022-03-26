const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const Post = require('./models/Post');
const port = 8081;

//configurações
    //handlebars
    app.engine('handlebars', handlebars.engine({ defaultLayout: 'main', runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }, }));
    app.set('view engine', 'handlebars');

    //body-parser
     app.use(bodyParser.urlencoded({extended: false}));
     app.use(bodyParser.json());

//Rotas
    app.get('/', function(req, res) {
        Post.findAll({order: [['id', 'DESC']]}).then(function(posts) {
            res.render('home', {posts: posts})
        })
    })

    app.get('/cad', function(req, res) {
        res.render('formulario');
    })

    app.post('/add', function (req, res) {
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function() {
            res.redirect('/')
        }).catch(function(erro) {
            res.send("Houv um erro: "+erro)
        })
    })

    app.get('/deletar/:id', function (req,res) {
        Post.destroy({where: {'id': req.params.id}}).then(function() {
            res.render('deletar')
        }).catch(function(erro) {
            res.send("Essa mensagem não existe! ")
        })
    })

app.listen(port, ()=> {
    console.log("Servidor está rodando em http://localhost:8081/cad");
});