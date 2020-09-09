async function pullsHandler({ req, res, authToken, payload, baseInfo }) {
  try {
    res
      .status(200)
      .json({ error: false, message: "successfully done bot stuff" });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Some internal server error occured",
      error,
    });
  }
}

module.exports = { pullsHandler };
