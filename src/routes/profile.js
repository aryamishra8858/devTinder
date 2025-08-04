const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    //Validate the token

    const user = req.user; // The user is attached to the request object by the middleware
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid profile data");
    }
    const loggedInUser = req.user; // The user is attached to the request object by the middleware

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key]; // Update user properties with the new data
    });

    await loggedInUser.save(); // Save the updated user data to the database

    res.json({
      message: `${loggedInUser.firstName} your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;
