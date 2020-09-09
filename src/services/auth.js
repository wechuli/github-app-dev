const { App } = require("@octokit/app");

const APP_ID = process.env.APP_ID; // replace with your app ID
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const app = new App({ id: APP_ID, privateKey: PRIVATE_KEY });
const jwt = app.getSignedJsonWebToken();

module.exports = { app, appJWT };
