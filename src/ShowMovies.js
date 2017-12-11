import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class ShowMovies extends Component {
  constructor(){
    super();

    this.state = {
      movies: [],
      imdbID: '',
      title: '',
      year: '',
      storyline: ''
    }
    this.addMovieToWatchList = this.addMovieToWatchList.bind(this)
  }


  addMovieToWatchList(i) {
    axios.post('http://localhost:3535/api/addmovie', {
      imdbID: this.props.moviesArray[i].imdb_id,
      title: this.props.moviesArray[i].title,
      year: this.props.moviesArray[i].year,
      storyline: this.props.moviesArray[i].storyline
    }).then(res => {
      this.setState({movies: this.props.moviesArray})
    })
  }

  // renderButton(index, isInWatchlist) {
  //   if (isInWatchlist) {
  //     return (<button onClick={this.removeMovieFromWatchList}>-</button>)
  //   }
  //   return (<button onClick={this.addMovieToWatchList}>+</button>)
  // }

  
  render() {
    console.log(this.props, 'showmovies props')

    var displayArray = this.props.moviesArray.map((element, index) => {
      return (
        <div className="SearchResults"key={index}>
          <span className="SearchResultsTitle">{ element.title }</span>
          <span className="SearchResultsYear">{ element.year }</span>
          {/* {this.renderButton(element.imdb_id, element.isInWatchlist)} */}
          <button onClick={()=> {this.addMovieToWatchList(index)} }>+++++</button>
          {/* <button onClick={() => {this.removeMovieFromWatchList(index)}}></button> */}
          <br/>
          <span>{ element.storyline }</span>
          <br/>
          <br/>
        </div>
      )
    })


    return (
      <div className="App">
        { displayArray }
      </div>
    );
  }
}
