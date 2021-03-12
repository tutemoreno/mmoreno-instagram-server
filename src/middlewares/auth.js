import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['access-token'],
      mode = req.headers['access-mode'];

    if (!token)
      return res
        .status(403)
        .json({ errors: [{ message: 'No token provided' }] });

    console.log('flag1', process.env[`SECRET_${mode}`]);

    const decoded = jwt.verify(token, process.env[`SECRET_${mode}`]);
    console.log('[DECODED]', decoded);
    // req.USER_ID = decoded.id;
    // req.ACCESS_MODE = decoded.accessMode;
    return res.status(401).json({ errors: [{ message: 'Unauthorized' }] });
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ errors: [{ message: 'Unauthorized' }] });
  }
};
