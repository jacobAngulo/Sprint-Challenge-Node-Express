const express = require("express");

const router = express.Router();

const adb = require("./actionModel");

router.get("/", async (req, res) => {
  try {
    const actions = await adb.get();
    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error retrieving actions" });
  }
});

router.put("/:id", async (req, res) => {
  if (
    req.body.project_id !== "" &&
    req.body.description !== "" &&
    req.body.notes !== ""
  ) {
    try {
      const updated = await adb.update(req.params.id, req.body);
      if (updated) {
        res.status(203).json(updated);
      } else {
        res
          .status(404)
          .json({ message: "action with that id is not in our database" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error updating action" });
    }
  } else {
    res.status(403).json({ message: "please fill out required fields" });
  }
});

router.post("/", async (req, res) => {
  if (
    req.body.project_id !== "" &&
    req.body.description !== "" &&
    req.body.notes !== ""
  ) {
    try {
      const posted = await adb.insert(req.body);
      res.status(203).json(posted);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error updating action" });
    }
  } else {
    res.status(403).json({ message: "please fill out required fields" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await adb.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error deleting action" });
  }
});

module.exports = router;
