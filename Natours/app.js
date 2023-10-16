const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

dotenv.config({ path: './config.env' });

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()).use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter).use('/api/v1/users', userRouter);

module.exports = app;
