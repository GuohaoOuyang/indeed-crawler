const Job = require("../models/jobModel");
const asyncHandler = require("express-async-handler");

// @desc    Fetch all jobs
// @route   GET /api/jobs
// @access  Public

const getJobs = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword;
  console.log(keyword);
  //search by keyword
  if (!keyword) {
    var jobs = await Job.find({});
  } else {
    jobs = await Job.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ],
    });
  }
  res.json({ jobs });
});

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Public

const deleteJob = asyncHandler(async (req, res) => {});

// @desc    Update a job
// @route   PATCH /api/jobs/:id
// @access  Public
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.json(job);
});

module.exports = { getJobs, deleteJob, updateJob };
