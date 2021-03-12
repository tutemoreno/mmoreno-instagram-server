import axios from 'axios';
const token =
    'ya29.a0AfH6SMB3SO94EiAv9uP2eMsvVobbvy49NPiMjZXZxyuzwctWKq7nRPE-Ab86E0VV6iK4onQ2AS-Cj4ZYNpwCQz6aEwiDK-13wtXbASb9jfWEpHNVooFEEB1tAOucTqwEJMk2iI9iGlKBO6LHrcsM0miidM0D',
  mode = 'FACEBOOK',
  userID = '10222901989005749',
  secret = '856dbf7ef1ad2c29587db26fe173cf60';

getAccess(token);

async function getAccess(token) {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/tokeninfo`,
    {
      params: { access_token: token },
    }
  );

  console.log(response);
}
