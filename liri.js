require("dotenv").config();
var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var fs = require("fs");


var parameter = process.argv.slice(3).join("+");
var action = process.argv[2];


function Liri() {
    switch (action) {
        case "concert-this":
            concertThis(parameter);
            break;

        case "spotify-this-song":
            spotifyThis(parameter);
            break;

        case "movie-this":
            movieThis(parameter);
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}
Liri();

function concertThis(artist) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.spotify.id;

    //get the queryUrl to see what date you need from the JSON
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            for (i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city);
                var date = response.data[i].venue.dateTime;
                console.log(moment(date).format("DD/MM/YYYY"));
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log("-------Data-------");
                console.log(error.repsonse.data);
                console.log("-------Status-------");
                console.log(error.repsonse.status);
            }
        })
}

function spotifyThis(song) {

    if (song === "") {
        console.log("Couldn't think of a song? Here's a great one!");
        console.log("Song name: The Sign");
        console.log("Link to song: https://open.spotify.com/album/5UwIyIyFzkM7wKeGtRJPgB");
        console.log("Artists name: Ace of Base");
        console.log("Album name: The Sign");
        return;
    }

    spotify.search({ type: 'track', query: song, limit: 3 }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else if (data) {
            data.tracks.items.forEach(function (item) {
                console.log("--------New Input---------")
                console.log("Song name: " + item.name);
                console.log("Link to song: " + item.album.external_urls.spotify);
                console.log("Artists name: " + item.album.artists[0].name);
                console.log("Album name: " + item.album.name);
            })
        }
    })
}


function movieThis(movieName) {
    console.log(movieName);
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    if (movieName === "") {
        console.log("Couldn't think of a movie?" + "\nYou have to watch Mr. Nobody!");
        movieThis("Mr. Nobody");
    }
    else {
        axios.get(queryUrl).then(
            function (response) {
                // * Title of the movie.
                console.log("Title: " + response.data.Title);
                // * Year the movie came out.
                console.log("Release Year: " + response.data.Year);
                // * IMDB Rating of the movie.
                console.log("IMDB Rating: " + response.data.Ratings[0].Value);
                // * Rotten Tomatoes Rating of the movie.
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                // * Country where the movie was produced.
                console.log("Country of production: " + response.data.Country);
                // * Language of the movie.
                console.log("Language: " + response.data.Language);
                // * Plot of the movie.
                console.log("Plot: " + response.data.Plot);
                // * Actors in the movie.
                console.log("Actors: " + response.data.Actors);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    }
}

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        
        var dataArr = data.split(",");
        console.log(dataArr);
        action = dataArr[0];
        parameter = dataArr[1];

        // else if (action) === "concert-this") {
        //     artist = dataArr[1];
        //     Liri();
        // }
        // else if (action === "spotify-this-song") {
        //     song = dataArr[1];
        //     console.log(song);
        //     Liri();
        // }
        // else (action === "movie-this"); {
        //     movieName = dataArr[1];
        //     Liri();
        // }
        Liri();
    });

}



//this works:
//     console.log("--------New Input---------")
//     console.log("Song name: " + data.tracks.items[i].name);
//     console.log("Link to song: " + data.tracks.items[i].album.external_urls.spotify);
//     console.log("Artists name: " + data.tracks.items[i].album.artists[0].name);
//     console.log("Album name: " + data.tracks.items[i].album.name);
