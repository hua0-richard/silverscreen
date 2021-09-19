const axios = require("axios");
const cheerio = require("cheerio");
//performing a GET request
axios
  .get("https://www.timeout.com/newyork/movies/best-movies-of-all-time")
  .then((response) => {
    //handling the success
    const html = response.data;

    //loading response data into a Cheerio instance
    const $ = cheerio.load(html);

    //selecting the elements with the data
    scrapedata = $("._h3_cuogz_1");

    const movieListText = []; 
    for (let i = 0; i < scrapedata.length; i++) {
        let movieTitlesSecond = $(scrapedata[i]);
        movieListText.push($(movieTitlesSecond).text());
    }

    //outputting the scraped data
    movieListText.pop();
    for (let i = 0; i < movieListText.length; i++) {
        if ( i < 9) { 
            movieListText[i] = movieListText[i].substring(3, movieListText[i].length - 7);
        } else if (i >= 9 && i != movieListText.length - 1) {
            movieListText[i] = movieListText[i].substring(4, movieListText[i].length - 7);
        } else if (i == movieListText.length - 1) {
            movieListText[i] = movieListText[i].substring(5, movieListText[i].length - 7);
        }
    }
    console.log(movieListText);

  })
  //handling error
  .catch((error) => {
    console.log(error);
  });
