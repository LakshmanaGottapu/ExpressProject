const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const requests = require('requests');
const homePath = path.join(__dirname,"../public/home.html");
const cssPath = path.join(__dirname,"../public/external.css");
const staticPath = path.join(__dirname,"../public");
// const htmlFileContent = fs.readFileSync(homePath,"utf-8");
// const cssFileContent = fs.readFileSync(cssPath,"utf-8");
const app = new express();
// server.use(express.static(staticPath));
//set the template engine as handle bars
const templatePath = path.join(__dirname,"../templates/views");
const partialPath = path.join(__dirname,"../templates/partials");
app.set("view engine", "hbs");
app.set("views",templatePath);
hbs.registerPartials(partialPath);
//set the route for template engine

app.get("/",(req,res)=>{
    // console.log("request is made.");
    // console.log("sending the response.......");
    res.render("index");
});

app.get("/about",(req,res)=>{
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=05e9d0f2bbf1bb8211140aa1d0e35935`;
    requests(url)
    .on('data',(chunk)=>{
        const responseObject = JSON.parse(chunk);
        console.log(`City is ${responseObject.name} temperature is ${responseObject.main.temp}`);
        res.write(responseObject.name);
    })
    .on('end',(err)=>{
        if(err) console.log(err);
        res.send();
    })
});
app.get("/about/*",(req,res)=>{
    res.render("404",{
        errorComment: "Oops the page you requested is not found in about page"
    });
});
app.get("/home",(req,res)=>{
    res.render("home");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/milestones",(req,res)=>{
    res.render("successpage");
});
// app.get('/style.css', (req, res)=> {
//     res.type('text/css');
//     res.sendFile(__dirname+'/style.css');
// });

// server.get("/", (req,res)=>{
//     const content= `
//     <html>
//     <head>
//       <title>My Web Page</title>
//       <style>${cssFileContent}</style>
//     </head>
//     <body>
//       ${htmlFileContent}
//     </body>
//   </html>
// `;
//     res.send(content);
// });


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port,()=> console.log(`listening to the server http://localhost:${port}`));