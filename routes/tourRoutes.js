const express = require('express');
const router = express.Router();
const {
  GetAllTours,
  GetTour,
  UpdateData,
  DeleteTour,
  CreateNewTour,
  checkBody,
  checkId,
} = require('./../controller/tourController');
router.param('id', checkId);
router.route('/').get(GetAllTours).post(checkBody, CreateNewTour);
router.route('/:id').get(GetTour).patch(UpdateData).delete(DeleteTour);
module.exports = router;
