const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({ error: false, message: "done processing" });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "there seems to be a big error" });
  }
});

module.exports = router;
