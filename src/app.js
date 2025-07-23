const express = require("express");
const app = express();

app.use("/user", 
    (req,res,next)=>{
    console.log("Handling the route user");
    // res.send("Route Handler 1");
    next(); // Call the next middleware or route handler
    },
    (req, res,next) => {
        // res.send("Route Handler 2");
        console.log("Handling the route user 2");
     // Call the next middleware or route handler
     next();
    },
        (req, res,next) => {
        // res.send("Route Handler 3");
        console.log("Handling the route user 3");
     // Call the next middleware or route handler
     next();
    },
        (req, res,next) => {
        res.send("Route Handler 4");
        console.log("Handling the route user 4");
     // Call the next middleware or route handler
    }
); 

app.listen(7000, () =>{
    console.log("Server is running on port 7000");
});