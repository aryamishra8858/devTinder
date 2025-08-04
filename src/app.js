const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", requestRouter); 
app.use("/", profileRouter);


connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(7000, () => {
      console.log("Server is running on port 7000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    // Exit the process with failure
  });
