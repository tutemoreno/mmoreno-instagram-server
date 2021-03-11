import axios from 'axios';

export async function signUp(req, res) {
  const { username, password } = req.body;

  const newUser = new User({
    username,
    password: User.encryptPassword(password),
  });

  const savedUser = await newUser.save();

  // expiresIn 5m
  const token = jwt.sign(
    { id: savedUser._id, accessMode: 'server' },
    config.SECRET,
    {
      expiresIn: 300,
    }
  );

  res.json({ token });
}

export async function signIn(req, res) {
  const { accessMode } = req.body;

  let auth;

  switch (accessMode) {
    case 'server':
      auth = await serverSignIn(req, res);

      break;

    case 'facebook':
      auth = await facebookSignIn(req, res);

      break;

    case 'google':
      auth = await googleSignIn(req, res);

      break;

    default:
      break;
  }

  auth.accessMode = accessMode;

  const token = jwt.sign(auth, config.SECRET, {
    expiresIn: 300,
  });

  res.json({ token });
}

async function serverSignIn(req, res) {
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

  return { id: userFound._id };
}

async function facebookSignIn(req, res) {
  const { userID, token } = req.body;

  const response = await axios.get(
    `https://graph.facebook.com/v10.0/${userID}?access_token=${token}`
  );

  if (!response.data)
    return res.status(401).json({ errors: [{ message: 'Invalid token' }] });

  const { id } = response.data;

  return { id };
}

async function googleSigIn(req, res) {
  const { token } = req.body;

  const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo`, {
    params: { id_token: token },
  });

  if (!response.data)
    return res.status(401).json({ errors: [{ message: 'Invalid token' }] });

  const { sub } = response.data;

  return { id: sub };
}
