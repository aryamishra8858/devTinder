const express = require("express");
const app = express();

app.use("/", (req,res)=>{
    res.send("Welcome to the Dev Tinder");
})

app.use ("/hello",(req,res)=>{
    res.send("Hello World");
});

app.use("/test", (req, res)=>{
    res.send("Hello from the server");
});

app.listen(7000, () =>{
    console.log("Server is running on port 7000");
});