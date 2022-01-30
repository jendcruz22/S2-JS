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
app.use("/public", express.static(path.join(__dirname, 'public')));

// SET UP SOME PAGE ROUTES
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});
app.get("/photos", (req, res) => {
    res.render("photos", { title: "Photos" })
});
app.get("/booking", (req, res) => {
    res.render("booking", { title: "Booking" })
});

// SET UP SERVER LISTENING
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});