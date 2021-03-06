import User from '../models/User.js';

export const checkIfUserAlreadyExists = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (user)
    return res
      .status(400)
      .json({ errors: [{ message: 'User already exists' }] });

  next();
};
