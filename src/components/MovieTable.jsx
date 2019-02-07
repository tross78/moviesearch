import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Poster from './Poster';
import { Link } from 'react-router-dom';
import { formatReleaseDate } from '../actions';
import styles from './MovieTable.module.css';

export default class MovieTable extends Component {



  render() {
    const style = {
      display: 'flex',
      flexWrap: 'wrap'
    }

    let movies = this.props.movies.filter(function (movie) {
      return movie.poster_path != null;
    }).map(function (movie) {
      var ratingClass = styles.high;
      if (movie.vote_average < 7 && movie.vote_average >= 5) {
        ratingClass = styles.medium;
      } else if (movie.vote_average < 5) {
        ratingClass = styles.low;
      }
      return (
        <Col xs={6} sm={4} md={3} key={movie.id} >
          {
            <div className={styles.cell}>
              <Link to={'/movie/' + movie.id} >
                <div className={styles.rating}>
                  <span className={ratingClass}>{movie.vote_average * 10}%</span>
                </div>
                <Poster info id={movie.id} path={movie.poster_path} title={movie.title} release_date={movie.release_date} responsive />
              </Link>
              <div className={styles.footer}>
                <p className="mt-1 mb-0">{movie.title}</p>
                <time>{formatReleaseDate(new Date(movie.release_date))}</time>
              </div>
            </div>
          }
        </Col>
      );
    });

    return (
      <Container fluid={false}>
        <h2 className={[styles.header, "text-left", "text-md-center"].join(' ')}>Popular Movies</h2>
        <Row className="display-flex flex-wrap">
          {movies}
        </Row>
      </Container>
    );
  }
}