// import { watch } from "fs";

var watchlist = [];
var id = 0;

module.exports = {
  create ( req, res ) {
    const { imdb_id, title, year, storyline } = req.body;
    watchlist.push({ imdb_id : imdb_id, title : title, year : year, storyline : storyline });
    id++;
    res.status(200).send( watchlist );
    console.log(watchlist);
  },

  read (req, res) {
    res.status(200).send(watchlist)
  },

  update (req, res) {
    const { text } = req.body;
    // console.log('req.body / text + ', text)
    const id = req.params.id;
    const updateYear = req.params.year;

    // const movieIndex = watchlist.findIndex( movie => movie.imdb_id == id );
    // const newMovieYear = movie[movieIndex].update
     watchlist = watchlist.map((movie, i) => {
      if (movie.imdb_id === id) {
        console.log('==update===>', i, id, movie.imdb_id)
        movie.year = updateYear;
      }
      return movie;
    })
    // const newArr = watchlist.map((movie, i) => {
    //   console.log('=============>', i, id)
    //   if (i === id) {
    //     movie[i].year = updateYear;
    //   }
    // })
    // watchlist.push.apply(watchlist, newArr)
    //a.push.apply(a, b)
    res.status(200).send( watchlist )
  },

  delete (req, res) {
    const deleteId = req.params.id;
    console.log('deleteId ' + deleteId)
    const watchlistIndex = watchlist.findIndex( movie => movie.imdb_id == req.params.id );
    console.log('watchlistIndex ' + watchlistIndex)
    if (watchlistIndex !== -1) {
      watchlist.splice(watchlistIndex, 1);
    }
    res.status(200).send(watchlist);
  }
}