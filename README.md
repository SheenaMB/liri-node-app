# liri-node-app
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters about music, musical artists, and films and gives you back specific data.

## Usage
Liri uses the Bands in Town Artist Events API to search for venue names, locations, and event dates for the searched artist if they are currently on tour. 

    Utilize this feature by inputing 
            
            "node liri.js concert-this <artist name>" 
    
    into the command line.
    

Liri uses the Spotify API to retrieve information on an inputed song, including a preview link from spotify, the artist and album names. 

    Utilize this feature by inputing 
    
        "node liri.js spotify-this-song <song name>" 
    
    into the command line.

Liri uses the axios package in tandem with the OMDB API to retrieve information on an inputed movie, including title, year of release, IMDB rating, Country of production, language, plot, actors. 

    Utilize this feature by inputing 
        
        "node liri.js movie-this <movie name>" 
    
    into the command line.    
    
For each command, there is a default if no search item is input.

## do-what-it-says

When "node liri.js do-what-it-says" is run in the command line, it will go into the random.txt file and follow the listed function and parameter.

Here are links to the working Liri app:
https://www.dropbox.com/s/gwit13hxc4cmdns/Liri%20ScreenRecording1.mov?dl=0

https://www.dropbox.com/s/qlzo8cv6fd7d5e4/Liri%20default%20settings1.mov?dl=0 

## Dependencies
If you'd like to work on LIRI, you need to install the following packages:

    - JSON packages
    - axios 
    - omdb api
    - dotenv    
    - moment
    - node spotify api

You will also need to get your personal Spotify API throught their developer API site.

Enjoy!
