const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");


profileRouter.get("/profile",userAuth, async (req, res) => {
  try {

    //Validate the token

    const user = req.user; // The user is attached to the request object by the middleware
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;