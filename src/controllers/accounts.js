import jwt from 'jsonwebtoken';
import User from '../models/User';

export async function checkIfAlreadyExists(req, res) {
  const { username } = req.body;

  const userFound = await User.findOne({ username });

  if (userFound)
    return res.json({ exists: true, message: 'User already exists' });

  res.json({ exists: false });
}

export async function serverSignUp(req, res) {
  const { username, password } = req.body;

  const userFound = await User.findOne({ username });

  if (userFound) return res.json({ message: 'User already exists' });

  const newUser = new User({
    username,
    password: await User.encryptPassword(password),
    mode: 'SERVER',
  });

  try {
    await newUser.save();
  } catch (error) {
    if (error) res.json(error);
  }

  res.json({ success: true, message: 'Register successful' });
}

export async function serverSignIn(req, res) {
  const { username, password } = req.body;

  const userFound = await User.findOne({ username });

  if (!userFound) return res.json({ message: 'User not found' });

  const matchPassword = await User.comparePassword(
    password,
    userFound.password
  );

  if (!matchPassword) return res.json({ message: 'Invalid password' });

  // expiresIn 1h
  const token = jwt.sign({ id: userFound._id }, 'mmoreno-app', {
    expiresIn: 3600,
  });

  res.json({ success: true, token, message: 'LoggedIn' });
}

export async function socialSignIn(req, res) {
  const { USER_ID, MODE } = req.AUTH;

  if (USER_ID) return res.json({ success: true, message: 'LoggedIn' });

  const newUser = new User({
    username: req.headers['access-social-id'],
    mode: MODE,
  });

  try {
    await newUser.save();
  } catch (error) {
    if (error) res.json(error);
  }

  res.json({ success: true, message: 'Register successful' });
}
