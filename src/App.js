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
      console.log(resp.data)
      // this.setState({movies: resp.data})
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

  // showWatchlist() {
  //   const watchlistFromController = axios.get('http://localhost:3535/api/getwatchlist').then((res) => {
  //     this.setState({watchlist: res.data})
  //   }).catch((err) => {
  //     console.log(err)
  //   })
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
          moviesArray = { this.state.movies }
        />
        {/* <button onClick={ showWatchlist }>watchlist</button> */}
      </div>
      </body>
    );
  }
}

export default App;
