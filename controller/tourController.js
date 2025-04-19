const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);
exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (val >= tours.length) {
    return res.status(404).json({
      status: 'failed',
      messages: 'Invaild ID',
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  //if (req.body.name == null || req.body.price == null) {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'failed',
      message: 'name or price not found',
    });
  }
  next();
};
exports.GetAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestAT: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};
exports.GetTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.UpdateData = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<upadated Tour here>',
    },
  });
};
exports.DeleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
exports.CreateNewTour = (req, res) => {
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
    },
  );
};
