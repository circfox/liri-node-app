// Set environmental variables with dotenv package.
require("dotenv").config();

//Import node-spotify-api NPM package;
var Spotify = require("node-spotify-api");

//Import API keys.
var keys = require("./keys");
console.log(keys.spotify.band);

//Import the request npm package.
var request = require("request");

//Import moment npm package;
var moment = require("moment");

//Import the FS package for read/write.
var fs = require("fs");

//access keys information 
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

var parameter = process.argv[3];

/**************************************************************************/
//function for running concert-this search
var bandsInTown = function (artist) {
  if (artist === undefined) {
    artist = 'Ace of Bases';
  }
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=test" + keys.spotify.band;

  request(queryUrl, function (error, response, body) {
    if (error) {
      throw error;
    } else if (!error) {
      var json = JSON.parse(body);
      console.log(json);
      console.log("Venue Name:" + json[0].venue.name);
      console.log("Venue Location: " + json[0].venue.city + ", " + json[0].venue.region);
      console.log("Event Date: " + json[0].datetime);
      fs.appendFile(function (err) {
        if (err) {
          return console.log(err);
        }
      });
    }
  });
}

/**************************************************************************/
//function for running Spotify search-
var getSpotify = function (songName) {
  if (songName === undefined) {
    songName = "The Sign";
  }
  spotify.search(
    { type: "track", query: songName },
    function (err, data) {
      if (err) {
        return console.log("Error occured: " + err);
      }

      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists[0].name);
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("--------------------------------");
      }
    }
  )
};

/**************************************************************************/
//movie-this function
function getMovie(parameter) {

  var queryUrl = "http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {
    if (parameter === undefined) {
      parameter = 'The Matrix Reloaded';
    }
    if (!error && response.statusCode === 200) {

      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year); console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
};

/**************************************************************************/
//function for do-what-it-says call
function justDoIt() {
  
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    } else {
      var dataArr = data.split(",");
      userInput = dataArr[1];
      commmand = dataArr[0];

      if (command === "concert-this") {
        bandsInTown();
      }
      if (command === "spotify-this-song") {
        getSpotify();
      }
      if (command === "movie-this") {
        getMovie();
      }
    }
    fs.appendFile("log.txt", "Random Text." + "\n", function (err) {
      if (err){
        console.log(err);
      }    
    })
  });
}

/**************************************************************************/
//Switch commands:
switch (command) {

  //concert-this
  case "concert-this":
    bandsInTown(parameter);
    break;

  //spotify-this-song
  case "spotify-this-song":
    getSpotify(parameter);
    break;

  //movie-this
  case "movie-this":
    getMovie(parameter);
    break;

  //do-what-it-says
  case "do-what-it-says":
    justDoIt();
    break;
}









