import { Router } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config.js';

import User from '../models/User.js';

const router = Router();

router.post('/authenticate', function (req, res) {
  console.log('llega');

  res.json({});
});

router.post('/signup', async function (req, res) {
  const { username, password } = req.body;

  // const userFound = await User.find({ username });

  const newUser = new User({
    username,
    password: User.encryptPassword(password),
  });

  const savedUser = await newUser.save();

  // expiresIn 5m
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 300,
  });

  res.json({ token });
});

router.post('signin', async function (req, res) {
  const { username, password } = req.body;

  const userFound = await User.findOne({ username });

  if (!userFound) return res.json({ errors: [{ message: 'User not found' }] });

  const matchPassword = await User.comparePassword(
    password,
    userFound.password
  );

  if (!matchPassword)
    return res
      .status(401)
      .json({ token: null, errors: [{ message: 'Invalid password' }] });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 300,
  });

  res.json({ token });
});

export default router;
