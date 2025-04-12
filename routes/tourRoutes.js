const express = require('express');
const router = express.Router();
const {
  GetAllTours,
  GetTour,
  UpdateData,
  DeleteTour,
  CreateNewTour,
} = require('./../controller/tourController');

router.route('/').get(GetAllTours).post(CreateNewTour);
router.route('/:id').get(GetTour).patch(UpdateData).delete(DeleteTour);
module.exports = router;
