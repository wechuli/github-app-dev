const express = require("express");
const app = require("../services/auth");
const { issuesHandler } = require("../controllers/issuesController");
const { pullsHandler } = require("../controllers/pullsController");
const { issues, pull_request } = require("../constants/githubEvents");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // all events from github to the app will contain the body and the x-github-event event header that shows the type of event
    const payload = req.body;
    const HTTP_X_GITHUB_EVENT = req.headers["x-github-event"];
    const X_HUB_SIGNATURE = req.headers["x-hub-signature"];
    console.log(req.headers);

    // we can take out the owner,installation_id and repo properties
    const owner = payload["repository"]["owner"]["login"];
    const repo = payload["repository"]["name"];
    const installationId = payload["installation"]["id"];
    const baseInfo = { owner, repo };

    const installationAccessToken = await app.getInstallationAccessToken({
      installationId,
    });

    const args = { req, res, payload, installationAccessToken, baseInfo };

    // route to different controllers depending on the x-github-event event header
    switch (HTTP_X_GITHUB_EVENT) {
      case issues:
        return issuesHandler(args);
      case pull_request:
        return pullsHandler(args);
      default:
        break;
    }
    res
      .status(200)
      .json({ error: false, message: "event doesn't have a handler yet" });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "there seems to be a big error",
      errorObject: error,
    });
  }
});

module.exports = router;
