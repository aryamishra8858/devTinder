const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("EmailId is not found in the database");
    }
    const isPaasswordValid = await bcrypt.compare(password);
    if (isPaasswordValid) {
     res.send("Login successful");
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// Get user by emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.findOne();
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(404).send("Something went wrong: " + error.message);
  }
});

// Feed API - GET/feed - get all the users from database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(404).send("Something went wrong: " + error.message);
  }
});

// Delete user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(404).send("Something went wrong: " + error.message);
  }
});

//Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  // console.log(data);
  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "password",
      "age",
      "gender",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Invalid update fields");
    }
    if (data?.skills.length > 20) {
      throw new Error("Skills array cannot exceed 20 items");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runvalidators: true,
    });
    res.send("User updated successfully");
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
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    // Exit the process with failure
  });
