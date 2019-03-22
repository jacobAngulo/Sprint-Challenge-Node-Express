const express = require("express");

const router = express.Router();

const pdb = require("./projectModel");

router.get("/", async (req, res) => {
  try {
    const projects = await pdb.get();
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error retrieving projects" });
  }
});

module.exports = router;
