const express = require("express");
const 
const { app, appJWT } = require("../services/auth");
const { issuesHandler } = require("../controllers/issuesController");
const { issues } = require("../constants/github-events");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // all events from github to the app will contain the body and the x-github-event event header that shows the type of event
    const payload = req.body;
    const HTTP_X_GITHUB_EVENT = req.headers["x-github-event"];

    // we can take out the owner,installation_id and repo properties
    const owner = payload["repository"]["owner"]["login"];
    const repo = payload["repository"]["name"];
    const installationId = payload['installation']['id'];

    const base_info = { owner, repo };


    const installationAccessToken = await app.getInstallationAccessToken({
      installationId,
    });

    // route to different controllers depending on the x-github-event event header
    switch (HTTP_X_GITHUB_EVENT) {
      case issues:
        return issuesHandler(req, res, installationAccessToken, base_info);

      default:
        break;
    }

    res.status(200).json({ error: false, message: "done processing" });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "there seems to be a big error" });
  }
});

module.exports = router;
