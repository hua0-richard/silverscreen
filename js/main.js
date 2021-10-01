/** movie list obtained through webscraping using node.js */
/** run node findMove.js for more information **/
const topHundred = [
    '2001: A Space Odyssey',
    'The Godfather',
    'Citizen Kane',
    'Jeanne Dielman, 23, Quai du Commerce, 1080 Bruxelles',
    'Raiders of the Lost Ark',
    'La Dolce Vita',
    'Seven Samurai',
    'In the Mood for Love',
    'There Will Be Blood',
    'Singin’ in the Rain',
    'Goodfellas',
    'North by Northwest',
    'Mulholland Drive',
    'Bicycle Thieves',
    'The Dark Knight',
    'City Lights',
    'Grand Illusion',
    'His Girl Friday',
    'The Red Shoes',
    'Vertigo',
    'Beau Travail',
    'The Searchers',
    'Persona',
    'Do the Right Thing',
    'Rashomon',
    'The Rules of the Game',
    'Jaws',
    'Double Indemnity',
    'The 400 Blows',
    'Star Wars',
    'The Passion of Joan of Arc',
    'Once Upon a Time in the West',
    'Alien',
    'Tokyo Story',
    'Pulp Fiction',
    'The Truman Show',
    'Lawrence of Arabia',
    'Psycho',
    'Sansho the Bailiff',
    'Andrei Rublev',
    'The Umbrellas of Cherbourg',
    'Chinatown',
    'The Seventh Seal',
    'Lost in Translation',
    'Taxi Driver',
    'Spirited Away',
    'Night of the Living Dead',
    'Battleship Potemkin',
    'Modern Times',
    'Breathless',
    'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    'M',
    'Blade',
    'The Bitter Tears of Petra von Kant',
    'Rome, Open City',
    'Nosferatu',
    'Airplane!',
    'Under the Skin',
    'Mad Max: Fury Road',
    'Apocalypse Now',
    'Brokeback Mountain',
    'Duck Soup',
    'The Blair Witch Project',
    'All the President’s Men',
    'The Apu trilogy',
    'The General',
    'Eternal Sunshine of the Spotless Mind',
    'The Texas Chain Saw Massacre',
    'Come and See',
    'Heat',
    'The Shining',
    'Toy Story',
    'Killer of Sheep',
    'A Woman Under the Influence',
    'Annie Hall',
    'Some Like It Hot',
    'Metropolis',
    'The Maltese Falcon',
    'This Is Spinal Tap',
    'It Happened One Night',
    'Die Hard',
    'The Conformist',
    'The Thing',
    'Daughters of the Dust',
    'Barry Lyndon',
    'Raging Bull',
    'Seven',
    'Aguirre, the Wrath of God',
    'The Battle of Algiers',
    'Women on the Verge of a Nervous Breakdown',
    'Boyhood',
    'The Discreet Charm of the Bourgeoisie',
    'Paths of Glory',
    'Secrets & Lies',
    'Sweet Smell of Success',
    'The Cabinet of Dr. Caligari',
    'Nashville',
    'Don’t Look Now',
    'Bonnie and Clyde',
    'Get Out'
]

const foundMovies = []
var index = 0

function getMovie(movieName) {
    axios.get('http://www.omdbapi.com/?apikey=5a1bf90d&t='+movieName)
        .then((response) => {
            let movie = response.data.Poster; 
            let movieName = response.data.Title; 
            let imdbID = response.data.imdbID;
            let moviePlot = response.data.Plot;
            let releaseDate = response.data.Year;
            let director = response.data.Director;
            let cast = response.data.Actors;
            let genre = response.data.Genre; 
            let scores = response.data.Ratings;
            if (movie == null || movie == "N/A") {
                sampleMovie()
            } else {
                console.log(scores[0])
                console.log(scores[2])
                console.log(scores[1])

                //IMDB
                if (!(scores[0] === undefined)) {
                    var scoresIMDB = scores[0].Value
                } else {
                    scoresIMDB = "N/A"
                }
                // Rotten Tomatoes
                if (!(scores[1] === undefined)) {
                    var scoresRT = scores[1].Value
                } else {
                    scoresRT = "N/A"
                }
                // Metacritic
                if (!(scores[2] === undefined)) {
                    var scoresMC = scores[2].Value
                } else {
                    scoresMC = "N/A"
                }
                
                var posterImage = document.getElementById("movie-poster")
                var movieNameContainer = document.getElementById("movieTitle")
                var imdbLink = document.getElementById("movLink")
                var moviePlotDisplay = document.getElementById("plotSummary")
                // Scores
                
                document.getElementById("MC").textContent = "Metacritic " + scoresMC
                document.getElementById("IM").textContent = "IMDB " + scoresIMDB
                document.getElementById("RT").textContent = "Rotten Tomatoes " + scoresRT
            
                // essential
                moviePlotDisplay.textContent = moviePlot
                imdbLink.href = ("https://www.imdb.com/title/"+imdbID)
                movieNameContainer.textContent = movieName
                posterImage.src = movie
                // extraInfo
                document.getElementById("genre").textContent = genre; 
                document.getElementById("cast").textContent = cast; 
                document.getElementById("director").textContent = director; 
                document.getElementById("releaseDate").textContent = releaseDate; 
                if (index == foundMovies.length) {
                    foundMovies.push(modifiedMovieName)
                }
            }
        })

        .catch((err) => {
            console.log(err);
        }); 
}
 
function reportMovie(movieName) {
    axios.get('http://www.omdbapi.com/?apikey=5a1bf90d&t='+movieName)
    .then((response) => {
        console.log(response);
        let movie = response.data.Poster; 
        console.log(movie)
        var posterImage = document.getElementById("movie-poster")
        posterImage.src = movie; 
    })

    .catch((err) => {
        console.log(err);
    }); 
}

function sampleMovie() {
    var randomMovie = Math.floor((Math.random() * topHundred.length))
    modifiedMovieName = topHundred[randomMovie];
    modifiedMovieName = modifiedMovieName.split(' ').join('+')
    getMovie(modifiedMovieName)

}

function currentMovie() {
    console.log(index)
    if (index == foundMovies.length) {
        sampleMovie()
    } else {
        getMovie(foundMovies[index])
    }
}

function nextMovie() {
    index = index + 1
    currentMovie()
}

function previousMovie() {
    if (index == 0) {
        return 
    }
    index = index - 1
    currentMovie()
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function addLoadingAnimation() {
    document.getElementById("loadingScreen").classList.add("show")
    delay(1000).then(() => document.getElementById("loadingScreen").classList.remove("show"))

}

function addInfoBox() {
    document.getElementById("infoCardContainer").classList.add("show")
}


function removeInfoBox() {
    document.getElementById("infoCardContainer").classList.remove("show")
}

function addCheckMark() {

    console.log("clicked")

}

function test() {
    console.log("console")
}


