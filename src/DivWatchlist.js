import React, { Component } from 'react';

const DivWatchlist = (props) => (
  <div key={props.index}>  
    <span>{ props.element.title }</span>
    <span>{ props.element.year }</span>
    <br/>
    <span>{ props.element.storyline }</span>
  </div>
);

export default DivWatchlist;