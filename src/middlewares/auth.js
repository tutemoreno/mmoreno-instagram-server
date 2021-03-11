import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['access-token'];

    if (!token)
      return res
        .status(403)
        .json({ errors: [{ message: 'No token provided' }] });

    const decoded = jwt.verify(token, process.env.SECRET);

    req.USER_ID = decoded.id;
    req.ACCESS_MODE = decoded.accessMode;

    next();
  } catch (error) {
    return res.status(401).json({ errors: [{ message: 'Unauthorized' }] });
  }
};
