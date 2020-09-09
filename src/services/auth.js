const jwt = require("jsonwebtoken");
const axios = require("axios");
const fs = require("fs");

const APP_ID = process.env.APP_ID;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;

const PRIVATE_KEY = fs.readFileSync("config/privateKey.pem").toString();

class App {
  constructor(params) {
    this.appID = params.APP_ID;
    this.privateKey = params.PRIVATE_KEY;
  }

  getSignedJwtToken() {
    const payload = {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 10 * 60, //expires after 10 minutes
      iss: this.appID,
    };
    console.log(this.appID);
    console.log("private key", this.privateKey);
    var token = jwt.sign(payload, this.privateKey, { algorithm: "RS256" });
    return token;
  }
  async getInstallationAccessToken(params) {
    const installationId = params.installationId;
    try {
      const headers = {
        Authorization: `Bearer ${this.getSignedJwtToken()}`,
        Accept: "application/vnd.github.machine-man-preview+json",
      };

      const { data } = await axios.post(
        `https://api.github.com/app/installations/${installationId}/access_tokens`,
        {},
        { headers }
      );
      console.log("Auth token", data.token);
      return data.token;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const app = new App({ APP_ID, PRIVATE_KEY });

module.exports = app;
