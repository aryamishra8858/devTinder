const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Assuming you have a User model defined

const userAuth = async (req, res, next) => {
  //Read the token from the request cookies
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const decodedObj = await jwt.verify(token, "Dev@Tinder$123");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }

  //Validate the token
  //Find the user
};

module.exports = {
  userAuth,
};
