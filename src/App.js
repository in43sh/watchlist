import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Search from './Search'
import ShowMovies from './ShowMovies'
// where is our express for the requirement

class App extends Component {
  constructor(){
    super();
    this.state = {
      titleInput: '',
      yearInput: '',
      movies: [],
      // watchlist: []
    }
    this.setMovies = this.setMovies.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);

  }

  setMovies(moviesArr) {
    this.setState({movies: moviesArr})
  }

  getMovies() {
    console.log('123123123')
    // console.log(resp.data)
    axios.get(`http://www.theimdbapi.org/api/find/movie?title=${this.state.titleInput}&year=${this.state.yearInput}`).then((resp) => {
      console.log(resp.data)
      // this.setState({movies: resp.data})
      this.setMovies(resp.data);
        }).catch(err => {
      console.log(err)
    })
  }

  handleTitleChange(val) {
    this.setState({ titleInput: val })
  }

  handleYearChange(val) {
    this.setState({ yearInput: val })
  }
  
  // addMovieToWatchList(index) {
  //   this.setState({
  //     watchlist: this.state.watchlist.concat(index)
  //   })
  // }
  
  // removeMovieFromWatchList(index) {
  //   this.setState({
  //     watchlist: this.state.watchlist.filter(movieId => movieId !== index)
  //   })
  // }
  
  // addMovieProperties(movie) {
  //   const isInWatchlist = this.state.watchlist.includes(movie.imdb_id)
  //   return Object.assign({}, movie, { isInWatchlist: isInWatchlist })
  // }

  render() {
    return (
      <body>
        <div className="App">
        <h3 className="Title">My watch list</h3>
        <Search
          getMovies={ this.getMovies }
          handleTitleChange={ this.handleTitleChange }
          handleYearChange= { this.handleYearChange }
        />
        <ShowMovies 
          moviesArray = { this.state.movies } //don't understand
          // addMovieToWatchList = {this.addMovieToWatchList.bind(this)}
          // removeMovieToWatchList = {this.removeMovieFromWatchList.bind(this)}
          // update from watch list
        />
      </div>
      </body>
    );
  }
}

export default App;
