const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// connect to local database
mongoose.connect('mongodb://skillcircle-db:27017/skillcircle-data', {
  useMongoClient: true,
});

// log every request to the console
app.use(morgan('dev'));

// setup html rendering
app.use(express.static(`${__dirname}/public`));
app.set('views', `${__dirname}/public/views`);
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

// get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// eslint-disable-next-line import/no-dynamic-require
require(`${__dirname}/routes/routes.js`)(app); // import routes

app.listen(port);

// eslint-disable-next-line no-console
console.log(`Skill circle demo running on port ${port}`);
