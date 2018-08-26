// Set environmental variables with dotenv package.
require("dotenv").config();

//Import node-spotify-api NPM package;
var Spotify = require("node-spotify-api");

//Import API keys.
var keys = require("./keys");

//Import the request npm package.
var request = require("request");

//Import moment npm package;
var moment = require("moment");

//Import the FS package for read/write.
var fs = require("fs");

//access keys information 
var spotify = new spotify(keys.spotify);