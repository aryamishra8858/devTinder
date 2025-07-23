const express = require("express");
const app = express();

const {adminAuth,userAuth} = require("./middleware/auth");

app.use("/admin", adminAuth);

app.get("/user/login", (req, res) => {
    res.send("User login page");    
});

app.get("/user/data", userAuth, (req, res) => {
    res.send("User data send");
}); 

app.get("/admin/getAllData", (req, res) => {
    res.send("Admin data send");    
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("User deleted");               
});


app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
