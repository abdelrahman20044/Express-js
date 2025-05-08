const express = require('express');
const morgan = require('morgan');

const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//1) middlewares
if (process.env.NODE_ENV === 'devolopment') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('helloo');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//2) route handlers

//3) routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/user', userRouter);
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `can't find ${req.originalUrl} on this server`,
  });
});
//4)start server
module.exports = app;
