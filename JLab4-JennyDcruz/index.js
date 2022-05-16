// Name: Jenny Dcruz
// Course: JS XML 
// Lab: 4

const exp = require("express");
const path = require("path");
const fs = require("fs");
const jsDom = require("jsdom");
const { JSDOM } = jsDom;

const port = "8888";
const app = exp();

let dom, libData;
const ns = "http://www.opengis.net/kml/2.2";
loadData();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.render("libraryList", {
    title: "List of libraries",
    libs: getList(),
  });
});

app.get("/libraryData", (req, res) => {
  const id = req.query["branch"];
  const library = getLibrary(id);
  res.render("libraryData", {
    title: library.name,
    lib: library,
  });
});

function loadData() {
  fs.readFile("./data/library-data.kml", "UTF-8", (err, data) => {
    dom = new JSDOM(data, { contentType: "application/xml" });
    libData = dom.window.document;
  });
}

function getList() {
  return libData.querySelectorAll("Placemark");
}

function getLibrary(id) {
  const library = libData.querySelector(`[id=${id}]`);
  const lib = {
    name: library.querySelector("name").textContent,
    description: library.querySelector("description").textContent,
    address: library.querySelector("address").textContent,
    phoneNumber: library.querySelector("phoneNumber").textContent,
  };
  return lib;
}
