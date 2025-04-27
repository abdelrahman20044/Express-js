const express = require('express');

const router = express.Router();
const {
  GetAllTours,
  GetTour,
  UpdateData,
  DeleteTour,
  CreateNewTour,
  checkBody,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  // eslint-disable-next-line import/no-useless-path-segments
} = require('./../controller/tourController');

//router.param('id', checkId);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plane/:year').get(getMonthlyPlan);
router.route('/top-5-cheap').get(aliasTopTours, GetAllTours);
router.route('/').get(GetAllTours).post(CreateNewTour);
router.route('/:id').get(GetTour).patch(UpdateData).delete(DeleteTour);
module.exports = router;
