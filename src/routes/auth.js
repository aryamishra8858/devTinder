const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    // Creating a new instance of User model

    // console.log(req.body);
    const userData = req.body;

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash, // Use the hashed password
    });
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("EmailId is not found in the database");
    }
    const isPaasswordValid = await user.validatePassword(password);
    if (isPaasswordValid) {
      const token = await user.getJWT();
      //Create a JWT token
      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 1000000),
        httpOnly: true, // security
        secure: false, // true if HTTPS
      });
      // res.json({ message: "Login successful", token });
      res.send("Login successful");
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("User logged out successfully");
});

module.exports = authRouter;
