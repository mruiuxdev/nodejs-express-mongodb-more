// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const jwtToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  const newUser = await User.create({ name, email, password, passwordConfirm });

  const token = jwtToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: { user: newUser },
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please, provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  const correctPassword = await user.correctPassword(password, user.password);

  if (!user || !correctPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = jwtToken(user._id);

  res.status(200).json({ status: 'success', token });
});

module.exports = { signup, login };
