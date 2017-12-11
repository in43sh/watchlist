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

  // update (req, res) {

  // },

  delete (req, res) {
    const deleteId = req.params.id;
    console.log('deleteId ' + deleteId)
    let watchlistIndex = watchlist.findIndex( movie => movie.imdb_id == req.params.id );
    console.log('watchlistIndex ' + watchlistIndex)
    watchlist.splice(watchlistIndex, 1);
    res.status(200).send(watchlist);
  }
}