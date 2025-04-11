const express = require('express');
const app = express();
const fs = require('fs');
/*app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' });
});*/
app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const GetAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
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
const port = 3000;
app.listen(port, () => {
  console.log('start getting requests');
});
