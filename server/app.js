const express = require("express");
const { join } = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");
const dotenv = require("dotenv");
const jobRouter = require("./routes/jobRoutes");
const { handleScraping } = require("./utils/indeed");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// handleScraping("software developer"); can be further handled by bullQ

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(express.json()); // to accept JSON data in the body
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(express.static(join(__dirname, "public")));

app.use("/api/jobs", jobRouter);

const PORT = process.env.PORT || "3001";

app.listen(PORT, console.log(`Server running on port ${PORT}`));
