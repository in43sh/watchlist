var watchlist = [];
var id = 0;


module.exports = {
  post ( req, res ) {
    const { imdb_id, title, year, storyline } = req.body;
    watchlist.push({ imdb_id : imdb_id, title : title, year : year, storyline : storyline });
    id++;
    res.status(200).send( watchlist );
    console.log(watchlist);
  }

  // delete (req, res) {
  //   const deleteId = req.params.imdb_id;
  //   watchlistIndex = watchlist.findIndex( movie => watchlist.id == deleteId );
  //   watchlist.splice(watchlistIndex, 1);
  //   res.status(200).send(watchlist);
  // }

  // get (req, res) {

  // }
}