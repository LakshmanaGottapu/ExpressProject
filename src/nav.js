const express = require('express');
const fs = require('fs');
const app = new express();
app.get("/",(req,res)=>{
    res.send("welcome to home page");
})
app.get("/about",(req,res)=>{
    // stream = fs.createReadStream("data.html");
    // stream.pipe(res);
    data = fs.readFileSync("data.html");
    res.status(200).send(data);
})
app.get("/contact",(req,res)=>{
    res.status(200).send("welcome to contact page");
})
app.get("/temperature",(req,res)=>{
    res.status(200).send({
        cityname:"London",
        long:"78",
        lat:"34",
        country:"GB",
        place:"England"
    });
})
app.listen(9000,"127.0.0.1");