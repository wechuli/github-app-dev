const jwt = require("jsonwebtoken");
const octokit = require("@octokit/core");



const APP_ID = process.env.APP_ID; // replace with your app ID
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const app = new App({ id: APP_ID, privateKey: PRIVATE_KEY });
const appJWT = app.getSignedJsonWebToken();

class AppAuth {
  constructor(appID, privateKey) {
    this.appID = appID;
    this.privateKey = privateKey;
  }

  getSignedJwtToken() {
    const payload = {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
    var token = jwt.sign({}, this.privateKey, { algorithm: "RS256" });
    return token;
  }
  getInstallationAccessToken(installationId) {}
}

module.exports = { app, appJWT };
