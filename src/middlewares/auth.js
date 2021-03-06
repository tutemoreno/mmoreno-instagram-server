import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/User.js';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token)
      return res
        .status(403)
        .json({ errors: [{ message: 'No token provided' }] });

    const decoded = jwt.verify(token, config.SECRET);

    req.USER_ID = decoded.id;

    const user = await User.findById(req.USER_ID, { password: 0 });

    if (!user)
      return res.status(404).json({ errors: [{ message: 'No user found' }] });

    next();
  } catch (error) {
    return res.status(401).json({ errors: [{ message: 'Unauthorized' }] });
  }
};
