const express = require("express");
const app = require("../app/app");
const { generateGitHubHmac } = require("../helpers/generateHmac");
const { issuesHandler } = require("../controllers/issuesController");
const { pullsHandler } = require("../controllers/pullsController");
const { issues, pull_request } = require("../helpers/githubEvents");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    // get necessary parameters from the webhook headers and body
    const HTTP_X_GITHUB_EVENT = req.headers["x-github-event"];
    const payload = req.body;
    const X_HUB_SIGNATURE = req.headers["x-hub-signature"];
    const owner = payload["repository"]["owner"]["login"];
    const repo = payload["repository"]["name"];
    const installationId = payload["installation"]["id"];
    const baseInfo = { owner, repo };

    
    // before we do anything, lets verify the payload was really from github
    const WebHookKey = process.env.WEBHOOK_SECRET;

    if (X_HUB_SIGNATURE !== generateGitHubHmac(payload, WebHookKey)) {
      return res
        .status(403)
        .json({ error: true, message: "unauthorized payload" });
    }

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
