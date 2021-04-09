const express = require("express");
const router = express.Router();
const {
  getJobs,
  deleteJob,
  updateJob,
} = require("../controllers/jobController");

router.get("/", getJobs);

router.route("/:id").delete(deleteJob).patch(updateJob);

module.exports = router;
