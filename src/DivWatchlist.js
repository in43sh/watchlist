import React, { Component } from 'react';

const DivWatchlist = (props) => (
  <div key={props.index}>  
    <span>{ props.element.title }</span>
    <span>{ props.element.year }</span>
    <br/>
    <span>{ props.element.storyline }</span>
  </div>
);


// const Search = ({handleTitleChange, handleYearChange, getMovies}) => (
//   <div className="App">
//     <input
//       className="TitleInput"
//       placeholder="Search for a movie..."
//       // value="default value for movie title"
//       onChange={ handleTitleChange }>
//     </input>
//     <input
//       className="YearInput"
//       placeholder="Year"
//       // value="defalut value for movie year"
//       onChange={ handleYearChange }>
//     </input>
//     <button onClick={ getMovies }>Search</button>
//     <br/>
//   </div>
// );

export default DivWatchlist;