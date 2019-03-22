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

router.get("/:id", async (req, res) => {
  const project = await pdb.getProjectActions(req.params.id);
  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ message: "project with that id does not exist" });
  }
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error retrieving projects" });
  }
});

router.put("/:id", async (req, res) => {
  if (req.body.description !== "" && req.body.name !== "") {
    try {
      const updated = await pdb.update(req.params.id, req.body);
      if (updated) {
        res.status(203).json(updated);
      } else {
        res
          .status(404)
          .json({ message: "project with that id is not in our database" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error updating project" });
    }
  } else {
    res.status(403).json({ message: "please fill out required fields" });
  }
});

router.post("/", async (req, res) => {
  if (req.body.description !== "" && req.body.name !== "") {
    try {
      const posted = await pdb.insert(req.body);
      res.status(203).json(posted);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error updating project" });
    }
  } else {
    res.status(403).json({ message: "please fill out required fields" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await pdb.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error deleting project" });
  }
});

module.exports = router;
