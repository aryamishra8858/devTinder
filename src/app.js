const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/signup", async (req,res)=>{
  //Creating a new instance of the user model
  const user = new User (req.body);
 
try{
  await user.save();
res.send("User created successfully");
} catch(error) {
  res.status(500).send("Internal Server Error" + error.message);
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
