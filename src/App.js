import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Search from './Search'
import ShowMovies from './ShowMovies'
import DivWatchlist from './DivWatchlist' 

class App extends Component {
  constructor(){
    super();
    this.state = {
      titleInput: '',
      yearInput: '',
      updateYearInput: '',
      movies: [],
      watchlist: []
    }
    this.setMovies = this.setMovies.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.addMovieToWatchList = this.addMovieToWatchList.bind(this)
    this.removeMovieFromWatchList = this.removeMovieFromWatchList.bind(this)
    // this.handleUpdateYear = this.handleUpdateYear.bind(this)
    // this.updateYear = this.updateYear.bind(this)
    // we usually need to bind data when we passing props or we can loose this. data
  }

  setMovies(moviesArr) {
    this.setState({movies: moviesArr})
  }

  getMovies() {
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
    }).then(resp => {
      this.setState({ watchlist: resp.data })
    })
  }

  removeMovieFromWatchList(id) {
    console.log('id ' + id)
    axios.delete(`http://localhost:3535/api/deletemovie/${id}`).then(resp => {
      this.setState({watchlist: resp.data})
    })
  }

  // componentWillMount -> render() -> componentDidMount
  // watchlist with saved data will load up even if we refresh the page
  componentDidMount () {
    this.assignWatchlist()
  }

  assignWatchlist() {
    const watchlistFromController = axios.get('http://localhost:3535/api/getwatchlist').then((resp) => {
      this.setState({ watchlist: resp.data })
      console.log(this.state.watchlist)
    }).catch((err) => {
      console.log(err)
    })
  }

  // handleUpdateYear (val) {
  //   this.setState({year: val})
  // }

  // updateYear (id, year) {
  //   axios.put(`http://localhost:3535/api/updateyear/${id}/${year}`).then(resp => {
  //     this.setState({ watchlist: resp.data })
  //   })
  // }

  render() {
    const displayWatchlist = this.state.watchlist.map((element, index) => {
      return ( 
        <div>
          <DivWatchlist 
            index = { index }
            element = { element }
          />
          {/* <input onChange={ (e) => this.handleUpdateYear() }></input>
          <button onClick={ this.updateYear(element.imdb_id, this.state.year) }></button> */}
        </div>
      )
    })

    return (
      <body>
        <div className="App">
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
        <h3 className="Title">My watch list</h3>
        { displayWatchlist }
        </div>
      </body>
    );
  }
}

export default App;
