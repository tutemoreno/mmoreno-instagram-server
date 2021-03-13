import jwt from 'jsonwebtoken';
import axios from 'axios';

import User from '../models/User';

export const verifyToken = async (req, res, next) => {
  let token = req.headers['access-token'],
    mode = req.headers['access-mode'],
    socialId = req.headers['access-social-id'];

  let userId, response;

  if (!token || !mode)
    return res.status(401).json({ message: 'No token provided' });

  switch (mode) {
    case 'SERVER':
      try {
        userId = jwt.verify(token, 'mmoreno-app');
      } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      break;

    case 'FACEBOOK':
      response = await axios.get(
        `https://graph.facebook.com/v10.0/${socialId}?access_token=${token}`
      );

      if (!response.data)
        return res.status(401).json({ message: 'Unauthorized' });

      userId = await User.findOne({
        username: response.data.id,
        mode,
      })._id;

      break;

    case 'GOOGLE':
      response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo`,
        {
          params: { access_token: token },
        }
      );

      if (!response.data)
        return res.status(401).json({ message: 'Unauthorized' });

      userId = await User.findOne({
        username: response.data.sub,
        mode,
      })._id;

      break;

    default:
      break;
  }

  req.AUTH = {
    USER_ID: userId,
    MODE: mode,
  };

  next();
};
