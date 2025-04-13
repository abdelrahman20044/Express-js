const express = require('express');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const morgan = require('morgan');
//1) middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('hello');
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
//4)start server
module.exports = app;
// app.get('/api/v1/tours', GetAllTours);
// app.get('/api/v1/tours/:id', GetTour);
// app.patch('/api/v1/tours/:id', UpdateData);
// app.delete('/api/v1/tours/:id', DeleteTour);
// app.post('/api/v1/tours', CreateNewTour);
