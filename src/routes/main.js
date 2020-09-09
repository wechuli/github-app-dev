const express = require("express");
const { app, appJWT } = require("../services/auth");
const { issues } = require("../constants/github-events");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // all events from github to the app will contain the body and the x-github-event event header that shows the type of event
    const payload = req.body;
    const HTTP_X_GITHUB_EVENT = req.headers["x-github-event"];

    // we can take out the owner and repo properties
    const owner = payload["repository"]["owner"]["login"];
    const repo = payload["repository"]["name"];

    // lets get the authentication token that will allow us to make authenticated calls to our app installation

    const { data } = await request("GET /repos/:owner/:repo/installation", {
      owner,
      repo,
      headers: {
        authorization: `Bearer ${appJWT}`,
        accept: "application/vnd.github.machine-man-preview+json",
      },
    });

    const installationId = data.id;

    const installationAccessToken = await app.getInstallationAccessToken({
      installationId,
    });

    switch (key) {
      case value:
        break;

      default:
        break;
    }
    console.log(req.body);
    res.status(200).json({ error: false, message: "done processing" });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "there seems to be a big error" });
  }
});

module.exports = router;
