const express = require("express");
const app = express();

//This will only handle GET call to /user
app.get("/user/:userId/:name/:password", (req,res)=>{
    console.log(req.params);
    res.send ({firstName: "Arya", lastName: "Mishra", age: 20});
});

app.listen(7000, () =>{
    console.log("Server is running on port 7000");
});