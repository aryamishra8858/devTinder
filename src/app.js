const express = require("express");
const app = express();

//Get /users => Middleware chain => request handler

app.use("/", (req, res, next) => {
//   res.send("Route Handler 1");
  next(); // Call the next middleware or route handler
});

app.get(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user1");
    // res.send("Route Handler 2");
    next(); // Call the next middleware or route handler
  },
  (req, res, next) => {
    res.send("Route Handler 3");
  },
  (req, res, next) => {
    res.send("Route Handler 4");
  }
);

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
