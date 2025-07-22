const express = require("express");
const app = express();

// app.use ("/hello",(req,res)=>{
//     res.send("Hello World");
// });

app.use("/user", (req,res)=>{
    res.send("Hello from the user route");
});

//This will only handle GET call to /user
app.get("/user", (req,res)=>{
    res.send ({firstName: "Arya", lastName: "Mishra", age: 20});
});

app.post("/user", (req,res)=>{
//saving to data to database
res.send ("Data successfully saved to the database");
});

app.delete("/user", (req,res)=>{
    res.send ("Deleted successfully");
})

//thia will match all the http method API calls to /test
app.use("/test", (req, res)=>{
    res.send("Hello from the server");
});

// app.use("/", (req,res)=>{
//     res.send("Welcome to the Dev Tinder");
// })

app.listen(7000, () =>{
    console.log("Server is running on port 7000");
});