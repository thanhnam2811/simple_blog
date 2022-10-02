const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
    })
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'app', 'views'));

routes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
