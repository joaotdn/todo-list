const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.render('index',
        {
            title: 'TODO List APP',
            message: 'Hello there!'
        });
});

app.get('*', (req, res, next) => {
    res.status(200).send('Lamentamos, a página procurada não está disponível.');
    next();
});

app.use((req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
});

app.set('view engine', 'pug');

app.listen(port, () => {
    console.log(`TODO List APP rodando na porta ${port}`);
});
