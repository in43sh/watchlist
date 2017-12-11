import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Search from './Search'
import ShowMovies from './ShowMovies'

class App extends Component {
  constructor(){
    super();
    this.state = {
      titleInput: '',
      yearInput: '',
      movies: [],
      watchlist: []
    }
    this.setMovies = this.setMovies.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.assignWatchlist = this.assignWatchlist.bind(this);
    this.addMovieToWatchList = this.addMovieToWatchList.bind(this)
    this.removeMovieFromWatchList = this.removeMovieFromWatchList.bind(this)
    this.assignWatchlist = this.assignWatchlist.bind(this)
  }

  setMovies(moviesArr) {
    this.setState({movies: moviesArr})
  }

  getMovies() {
    console.log('123123123')
    // console.log(resp.data)
    const endpoint = `http://www.theimdbapi.org/api/find/movie?title=${this.state.titleInput}&year=${this.state.yearInput}`
    console.log('endpoint -> ', endpoint)
    axios.get(endpoint).then((resp) => {
      console.log(resp.data)
      this.setMovies(resp.data);
        }).catch(err => {
      console.log(err)
    })
  }

  handleTitleChange(event) {
    this.setState({ titleInput: event.target.value })
  }

  handleYearChange(event) {
    this.setState({ yearInput: event.target.value })
  }

  addMovieToWatchList(i) {
    axios.post('http://localhost:3535/api/addmovie', {
      imdb_id: this.state.movies[i].imdb_id,
      title: this.state.movies[i].title,
      year: this.state.movies[i].year,
      storyline: this.state.movies[i].storyline
    }).then(res => {
      this.setState({ watchlist: res.data })
    })
  }

  removeMovieFromWatchList(id) {
    console.log('id ' + id)
    axios.delete(`http://localhost:3535/api/deletemovie/${id}`).then(resp => {
      this.setState({watchlist: this.state.movies})
    })
  }

  assignWatchlist() {
    const watchlistFromController = axios.get('http://localhost:3535/api/getwatchlist').then((resp) => {
      this.setState({watchlist: resp.data})
      console.log(this.state.watchlist)
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    const displayWatchlist = this.state.watchlist.map((element, index) => {
      return (
        <div key={index}>
          <span>{ element.title }</span>
          <span>{ element.year }</span>
          <br/>
          <span>{ element.storyline }</span>
        </div>
      )
    })

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
          SearchResults = { this.state.movies }
          addMovieToWatchList = { this.addMovieToWatchList }
          removeMovieFromWatchList = { this.removeMovieFromWatchList }
        />
        <button onClick={ this.assignWatchlist }>watchlist</button>
        { displayWatchlist }
        </div>
      </body>
    );
  }
}

export default App;
