var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
require('dotenv').config();

const todoRouter = require('./routes/todo')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
    origin: 'http://localhost:3001', //api front
};
app.use(cors(corsOptions));

app.use('/api/v1/todo', todoRouter);

module.exports = app;
