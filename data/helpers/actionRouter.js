const express = require("express");

const router = express.Router();

const adb = require("./actionModel");

router.get("/", async (req, res) => {
  console.log("running");
  try {
    const actions = await adb.get();
    console.log(actions);
    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error retrieving actions" });
  }
});

module.exports = router;
