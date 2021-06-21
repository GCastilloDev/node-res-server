const { OAuth2Client } = require("google-auth-library");

const googleVerify = async (idToken) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, picture: img, email } = ticket.getPayload();

  return {
    name,
    img,
    email,
  };
};

module.exports = { googleVerify };
