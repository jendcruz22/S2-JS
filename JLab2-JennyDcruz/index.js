// const http = require('http');
// const port = process.env.PORT || 3000;

// const server = http.createServer((req, res) => {
//  res.statusCode = 200;
//  res.setHeader('Content-Type', 'text/html');
//  res.end('<h1>Hello, World!</h1>');
// });

// server.listen(port, () => {
//  console.log(`Server running at port ${port}`);
// });

// IMPORT REQUIRED MODULES
const express = require("express");
const path = require("path");

// SET UP EXPRESS OBJECT
const app = express();
const port = process.env.PORT || "8888";

// SET UP PATHS TO IMPORTANT FOLDERS AND/OR FILES
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// CSS AND CLIENT-SIDE JS ARE STATIC FILES
// REFERENCE: https://stackoverflow.com/questions/48787337/images-not-showing-pug-express-node-js
app.use("/public", express.static(path.join(__dirname, 'public')));

// TEST EXPRESS TO SEE IF IT'S WORKING
// A GET REQUEST ON THE ROOT PAGE ("/") IS JUST A PAGE LOAD OF THE HOME PAGE
// (req, res) => {} is the equivalent of function(req, res) {}
// app.get("/", (req, res) => {
//     res.status(200).send("Testing...");
// });

// SET UP SOME PAGE ROUTES
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});
app.get("/about", (req, res) => {
    res.render("about", { title: "About" })
});

// SET UP SERVER LISTENING
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});