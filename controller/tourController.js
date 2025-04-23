// const fs = require('fs');
const { json } = require('express');
const { options } = require('../app');
const Tour = require('../models/tourModel');
/*const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);*/
// exports.checkId = (req, res, next, val) => {
//   console.log(`Tour id is ${val}`);
//   if (val >= tours.length) {
//     return res.status(404).json({
//       status: 'failed',
//       messages: 'Invaild ID',
//     });
//   }
//   next();
// };
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
exports.GetAllTours = async (req, res) => {
  try {
    // 1) Build the query
    const queryobj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryobj[el]);
    // Advanced filtering
    let querystring = JSON.stringify(queryobj);
    querystring = querystring.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`,
    );
    // Create the initial query (without awaiting it yet!)
    let query = Tour.find(JSON.parse(querystring)); // find with no argu return all documents
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' '); //ex price,duration > ['price', 'duration'] > "price duration"
      query = query.sort(sortBy); // sort by = "price duration"  which mongodb understand
    } else {
      query = query.sort('-createdAT'); // if no sorting sort by new created first
    }
    // 2) Execute the query
    const tours = await query;
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
    });
  }
};
exports.GetTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); // find with document with id
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
    });
  }
};
exports.UpdateData = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // to return the new modified document
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};
exports.DeleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};
exports.CreateNewTour = async (req, res) => {
  try {
    const NewTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: NewTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'invaild data',
    });
  }
};
/*exports.CreateNewTour = (req, res) => {
  // const NewId = tours[tours.length - 1].id + 1;
  // const NewTour = Object.assign({ id: NewId }, req.body);
  // tours.push(NewTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: NewTour,
    // },
  });
  // },
  // );
};*/
