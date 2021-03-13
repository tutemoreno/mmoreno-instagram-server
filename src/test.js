import axios from 'axios';
import jwt from 'jsonwebtoken';
import PEM from './googlePEM.json';
const token = 'asdasd',
  mode = 'FACEBOOK',
  CLIENT_ID =
    '61568487421-dn6ajb4a6e5cdfa1kichmt9bkhkbapch.apps.googleusercontent.com';

// getAccess(token);
verify();

async function getAccess(token) {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/tokeninfo`,
    {
      params: { access_token: token },
    }
  );

  console.log(response);
}
