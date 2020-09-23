const axios = require("axios");
async function issuesHandler(args) {
  const { req, res, installationAccessToken, payload, baseInfo } = args;
  console.log(payload);

  try {
    res
      .status(200)
      .json({ error: false, message: "successfully done bot stuff" });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Some internal server error occured",
      errorObject: error,
    });
  }
}

module.exports = { issuesHandler };
