const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateProfile,
  deleteProfile,
} = require('../controllers/userController');
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.patch('/reset-password/:token', resetPassword);
router.patch('/update-password', protect, updatePassword);
router.patch('/update-profile', protect, updateProfile);
router.delete('/delete-profile', protect, deleteProfile);
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
