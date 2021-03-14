import jwt from 'jsonwebtoken';
import axios from 'axios';

import User from '../models/User';

export const verifyToken = async (req, res, next) => {
  let token = req.headers['access-token'],
    mode = req.headers['access-mode'],
    socialId = req.headers['access-social-id'];

  let user, response;

  if (!token || !mode)
    return res.status(401).json({ message: 'No token provided' });

  try {
    switch (mode) {
      case 'SERVER':
        user = jwt.verify(token, 'mmoreno-app');

        break;

      case 'FACEBOOK':
        response = await axios.get(
          `https://graph.facebook.com/v10.0/${socialId}?access_token=${token}`
        );

        user = await User.findOne({
          username: response.data.id,
          mode,
        });

        break;

      case 'GOOGLE':
        response = await axios.get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo`,
          {
            params: { access_token: token },
          }
        );

        user = await User.findOne({
          username: response.data.sub,
          mode,
        });

        break;

      default:
        break;
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.AUTH = {
    USER_ID: user ? user._id : null,
    MODE: mode,
  };

  console.log('[AUTH]', req.AUTH);

  next();
};
