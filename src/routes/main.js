const express = require("express");
const app = require("../services/auth");
const { issuesHandler } = require("../controllers/issuesController");
const { pullsHandler } = require("../controllers/pullRequestsController");
const { issues, pull_request } = require("../constants/githubEvents");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // all events from github to the app will contain the body and the x-github-event event header that shows the type of event
    const payload = req.body;
    const HTTP_X_GITHUB_EVENT = req.headers["x-github-event"];

    // we can take out the owner,installation_id and repo properties
    const owner = payload["repository"]["owner"]["login"];
    const repo = payload["repository"]["name"];
    const installationId = payload["installation"]["id"];
    const baseInfo = { owner, repo };

    const installationAccessToken = await app.getInstallationAccessToken(
      installationId
    );

    const args = { req, res, installationAccessToken, baseInfo };

    // route to different controllers depending on the x-github-event event header
    switch (HTTP_X_GITHUB_EVENT) {
      case issues:
        return issuesHandler(args);
      case pull_request:
        return pullsHandler(args);
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
