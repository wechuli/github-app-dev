async function issuesHandler({ req, res, authToken, payload, baseInfo }) {
  try {
    console.log(authToken);
    console.log(payload);
    res
      .status(200)
      .json({ error: false, message: "successfully done bot stuff" });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Some internal server error occured",
      errorObject:error,
    });
  }
}

module.exports = { issuesHandler };
