const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/signup", async (req,res)=>{
});

// Get user by emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try{
    const users = await User.findOne();
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    } 
  } catch (error) {
    res.status(404).send("Something went wrong: " + error.message);
  }
}
);


// Feed API - GET/feed - get all the users from database
app.get("/feed",async (req,res) => {

  try{
 const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(404).send("Something went wrong: " + error.message);
  }
});


connectDB() 
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(7000, () => {
      console.log("Server is running on port 7000");
    });
  })
  .catch(error => {
    console.error("MongoDB connection error:", error);
    // Exit the process with failure
  });
