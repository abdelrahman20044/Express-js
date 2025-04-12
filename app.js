const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
//1) middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('hello');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2) route handlers
const GetAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestAT: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};
const GetTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'failed',
      messages: 'Invaild ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
const UpdateData = (req, res) => {
  if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({
      status: 'failed',
      messages: 'Invaild ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<upadated Tour here>',
    },
  });
};
const DeleteTour = (req, res) => {
  if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({
      status: 'failed',
      messages: 'Invaild ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
const CreateNewTour = (req, res) => {
  const NewId = tours[tours.length - 1].id + 1;
  const NewTour = Object.assign({ id: NewId }, req.body);
  tours.push(NewTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: NewTour,
        },
      });
    }
  );
};
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not yet defined!',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not yet defined!',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not yet defined!',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not yet defined!',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not yet defined!',
  });
};
//3) routes
// app.get('/api/v1/tours', GetAllTours);
// app.get('/api/v1/tours/:id', GetTour);
// app.patch('/api/v1/tours/:id', UpdateData);
// app.delete('/api/v1/tours/:id', DeleteTour);
// app.post('/api/v1/tours', CreateNewTour);
app.route('/api/v1/tours').get(GetAllTours).post(CreateNewTour);
app
  .route('/api/v1/tours/:id')
  .get(GetTour)
  .patch(UpdateData)
  .delete(DeleteTour);
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/user/:id').get(getUser).patch(updateUser).delete(deleteUser);
//4)start server
const port = 3000;
app.listen(port, () => {
  console.log('start getting requests');
});
