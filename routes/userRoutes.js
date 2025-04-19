const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  // eslint-disable-next-line import/no-useless-path-segments
} = require('./../controller/userController');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
