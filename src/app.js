const express = require("express");
const app = express();

app.use("/",(err,req, res, next) => {
    if (err) {
        return res.status(500).send("something went wrong");//Log your error
    }   
});

app.get("/getUserData",(req, res) => {
    // try{
        //Logic all DB call and get user data
         throw new Error("uiksjhj"); // Simulating an error
    res.send("User data send"); 
    // } catch (err) {
    //     res.status(500).send("Internal Server Error");
    // }
   
}); 

app.use("/",(err,req, res, next) => {
    if (err) {
        return res.status(500).send("something went wrong");//Log your error
    }   
});

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
