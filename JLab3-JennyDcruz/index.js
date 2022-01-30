//IMPORT REQUIRED MODULES
const express = require("express");
const path = require("path");
const mongo = require("mongodb").MongoClient;

//connection string is "mongodb://" followed by DB host followed
//by DB name
const dbUrl = "mongodb://localhost:27017/testdb";

//import ObjectId type
var ObjectId = require("mongodb").ObjectID;

//set up Express object
const app = express(); //app is the Express object
const port = process.env.PORT || "8888";

//set up paths to important folders and/or files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//CSS and client-side JS are static files
app.use(express.static(path.join(__dirname, "public")));

//tell Express how to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//db will be used to run queries and commands
//movieDetails will store data from DB to be passed along to templates
var db, movieDetails;
mongo.connect(dbUrl, (error, client) => {
  db = client.db("testdb"); //make sure that "testdb" is selected
  refreshLinks();
});

//set up some page routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home", links: movieDetails });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About", links: movieDetails });
});

//ADMIN PAGE
app.get("/movie/admin", (req, res) => {
  res.render("movie-admin", { title: "movie links admin", links: movieDetails });
});

//ADMIN ADD FORM
app.get("/movie/add", (req, res) => {
  res.render("movie-add", { title: "Add movie link", links: movieDetails, numLinks: movieDetails.length });
});

//ADMIN ADD FORM HANDLER
app.post("/movie/add/link", (request, response) => {
  //get form data
  //POST requests hold form data in the BODY
  let movieName = request.body.movieName;
  let year = request.body.year;
  var newLink = {"movieName": movieName, "year": year};
  db.collection("movieDetails").insertOne(newLink, (error, result) => {
    if (error) throw error;
    refreshLinks();
    response.redirect("/movie/admin"); //redirect back to admin page
  });
});

//ADMIN DELETE FORM HANDLER
app.get("/movie/delete", (request, response) => {
  //get link _id from query string
  let id = ObjectId(request.query.linkId);
  //console.log(id);
  //delete the document with the selected _id
  db.collection("movieDetails").deleteOne(
    { _id: id },
    (error, result) => {
      if (error) throw error;
      refreshLinks(); //refresh to reflect changes
      response.redirect("/movie/admin");
    }
  );
});

//ADMIN EDIT FORM
app.get("/movie/edit", (request, response) => {
  //get the link _id from query string
  let id = ObjectId(request.query.linkId);
  db.collection("movieDetails").findOne(
    { _id: id },
    (error, result) => {
      if (error) throw error;
      //console.log(result);
      response.render("movie-edit", { title: "Edit movie link", links: movieDetails, editLink: result });
    }
  );
});

//ADMIN EDIT FORM HANDLER
app.post("/movie/edit/link", (request, response) => {
  //get values from form submission and update data
  let id = ObjectId(request.body.id);
  let movieName = request.body.movieName;
  let year = request.body.year;
  //run the update command
  //update needs filter, update, options, callback
  db.collection("movieDetails").updateOne(
    { _id: id }, //filter
    //update
    {
      $set: {
        movieName: movieName,
        year: year
      }
    },
    (error, result) => {
      //console.log(result);
      if (error) throw error;
      refreshLinks();
      response.redirect("/movie/admin");
    }
  );
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

//QUERY LINK DATA FROM DATABASE
function refreshLinks() {
  db.collection("movieDetails").find({}).toArray((err, res) => {
    if (err) throw err;
    //console.log(res);
    movieDetails = res; //get all documents in movieDetails and convert to array
  });
}