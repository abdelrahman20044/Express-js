const express = require('express');
const router = express.Router();
const {
  GetAllTours,
  GetTour,
  UpdateData,
  DeleteTour,
  CreateNewTour,
  checkId,
} = require('./../controller/tourController');
router.param('id', checkId);
router.route('/').get(GetAllTours).post(CreateNewTour);
router.route('/:id').get(GetTour).patch(UpdateData).delete(DeleteTour);
module.exports = router;
