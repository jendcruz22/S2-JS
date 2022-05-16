// NAME: JENNY HILLARY DCRUZ
// COURSE: JS XML
// LAB: 5
// DATE OF SUBMISSION: 20 FEB 2022

const express = require("express");
const path = require("path");
const fs = require("fs"); //file r/w module built-in to Node.js
//const https = require("https"); //built-in https module
const axios = require("axios");
const qs = require("querystring"); //built-in querystring module for manipulating query strings

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || "8888";

const trakt = "https://api.trakt.tv/";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//set up static path (for use with CSS, client-side JS, and image files)
app.use("/public", express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  displayTrendingMovies(res);
});

app.get("/shows", (req, res) => {
    displayTrendingShows(res);
});

//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

//function to display trending movies
function displayTrendingMovies(res) {
  var pageData = {
    title: "Trending Movies",
    movies: null
  };
  axios(
    //the request
    {
      url: "/movies/trending?extended=full",
      baseURL: trakt,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  ).then(function (response){
    //on success do stuff
    console.log(response.data);
    pageData.movies = response.data; //store JSON results in pageData.movies (previously null)
    res.render("index", pageData);
  }).catch(function (error){
    console.log(error);
  });
}

//function to display trending TV shows
function displayTrendingShows(res) {
    var pageData = {
      title: "Trending TV Shows",
      shows: null
    };
    axios(
      //the request
      {
        url: "/shows/popular?page=1&limit=15",
        baseURL: trakt,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": 2,
          "trakt-api-key": process.env.TRAKT_CLIENT_ID
        }
      }
    ).then(function (response){
      //on success do stuff
      console.log(response.data);
      pageData.shows = response.data; //store JSON results in pageData.movies (previously null)
      res.render("shows", pageData);
    }).catch(function (error){
      console.log(error);
    });
  }