import React, { Component } from 'react';
import './App.css';
import { MovieList, MovieDetail, Main } from './blocks';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main/>
      </div>
    );
  }
}

export default App;
