async function issuesHandler(args) {
  try {
    const req = args.req;
    const res = args.res;
    const installationAccessToken = args.installationAccessToken;
    const payload = args.payload;
    const baseInfo = args.baseInfo;

    
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
