var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.render('index',
        {
            title: 'TODO List APP',
            message: 'Hello there!'
        });
});

app.set('view engine', 'pug');

app.listen(3001, function () {
    console.log('TODO rodando na porta 3001');
});
