const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");


requestRouter.post("/sendConnectionRequest",userAuth, async (req, res) => {
  const user = req.user; // The user is attached to the request object by the middleware
  //Sending a connection request
  console.log("Connection request sent");
  res.send(user.firstName + "sent the connection request to");
});

module.exports = requestRouter;