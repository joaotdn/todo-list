const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(router);

app.set('views', './views');
app.set('view engine', 'pug');

app.locals.tasks = [];

router.get('/', (req, res) => {
    res.render('index',
        {
            title: 'TODO List APP',
        }
    );
});

router.post('/todo/', (req, res) => {
    const {id, name} = req.body;
    const todo = {
        id,
        name
    };
    app.locals.tasks.unshift(todo);
    console.log('Tarefa adicionada: ', req.body);
    res.redirect("/");
});

router.get('/edit/:id/', (req, res) => {
    const {id} = req.params;
    app.locals.tasks.forEach(task => {
        if (task.id === id) {
            task.name = req.body.name;
            console.log('Tarefa atualizada: ', task);
        }
    });
    res.redirect("/");
});

router.get('/complete/:id/', (req, res) => {
    const {id} = req.params;
    app.locals.tasks.forEach(task => {
        if (task.id === id) {
            task.complete = true;
            console.log('Tarefa completa: ', task);
        }
    });
    res.redirect("/");
});

router.get('/delete/:id/', (req, res) => {
    const {id} = req.params;
    app.locals.tasks = app.locals.tasks.filter(task => task.id !== id);
    console.log('Tarefa deletada');
    res.redirect('/');
});

const server = app.listen(PORT, () => {
    console.log(`TODO List APP rodando na porta ${PORT}`);
});

server.timeout = 1000;