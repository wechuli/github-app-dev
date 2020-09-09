const jwt = require("jsonwebtoken");
const axios = require("axios");

const APP_ID = process.env.APP_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

class App {
  constructor({ appID, privateKey }) {
    this.appID = appID;
    this.privateKey = privateKey;
  }

  getSignedJwtToken() {
    const payload = {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 10 * 60, //expires after 10 minutes
      iss: this.appID,
    };
    var token = jwt.sign(payload, this.privateKey, { algorithm: "RS256" });
    return token;
  }
  async getInstallationAccessToken({ installationId }) {
    const headers = {
      Authorization: `Bearer ${this.getSignedJwtToken()}`,
      Accept: "application/vnd.github.machine-man-preview+json",
    };

    const { data } = await axios.post(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      {},
      { headers }
    );

    return data.token;
  }
}

const app = new App({ APP_ID, PRIVATE_KEY });

module.exports = app;
