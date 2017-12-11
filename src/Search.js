import React, { Component } from 'react';
import './App.css';

const Search = ({handleTitleChange, handleYearChange, getMovies}) => (
  <div className="App">
    <input
      className="TitleInput"
      placeholder="Search for a movie..."
      // value="transformers"
      onChange={ handleTitleChange }>
    </input>
    <input
      className="YearInput"
      placeholder="Year"
      // value="2007"
      onChange={ handleYearChange }>
    </input>
    <button onClick={ getMovies }>Search</button>
    <br/>
  </div>
);
export default Search;