const jwt = require("jsonwebtoken");
const axios = require("axios");
const fs = require("fs");

const APP_ID = process.env.APP_ID;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY;

//console.log(PRIVATE_KEY1);

const PRIVATE_KEY = fs.readFileSync("config/privateKey.pem").toString();
//const PRIVATE_KEY = process.env.PRIVATE_KEY;

class App {
  constructor(params) {
    this.APP_ID = params.APP_ID;
    this.PRIVATE_KEY = params.PRIVATE_KEY;
  }

  getSignedJwtToken() {
    const payload = {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 10 * 60, //expires after 10 minutes
      iss: this.APP_ID,
    };
    var token = jwt.sign(payload, this.PRIVATE_KEY, { algorithm: "RS256" });
    return token;
  }
  async getInstallationAccessToken(params) {
    const { installationId } = params;
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
      return data.token;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const app = new App({ APP_ID, PRIVATE_KEY });

module.exports = app;
