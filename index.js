const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.locals.tasks = [{id: 0, name: 'Desenvolver TODO APP', complete: false}];

app.get('/', (req, res) => {
    res.render('index',
        {
            title: 'TODO List APP',
        }
    );
});

app.get('*', (req, res, next) => {
    res.status(200).send('Lamentamos, a página procurada não está disponível.');
    next();
});

app.set('views', './views');
app.set('view engine', 'pug');

app.listen(PORT, () => {
    console.log(`TODO List APP rodando na porta ${PORT}`);
});
