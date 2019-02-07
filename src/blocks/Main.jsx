import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={MovieList}/>
        <Route path="/search/:keyword" component={MovieList} />
        <Route path="/movie/:id" component={MovieDetail} />
      </Switch>
    </main>
  );
}
export default Main;