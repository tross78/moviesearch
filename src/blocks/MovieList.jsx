import React, { Component } from 'react';
import { MovieTable } from '../components';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchMovieList, searchMovieList } from '../actions';
import SearchBar from '../components/SearchBar';
import AppHeader from '../components/AppHeader';
import styles from './MovieList.module.css';

class MovieList extends Component {

  componentDidMount() {
    if (!this.props.match.params.keyword) {
      const { dispatch } = this.props;
      dispatch(fetchMovieList());
    } else {
      const { dispatch } = this.props;
      dispatch(searchMovieList(this.props.match.params.keyword));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.match.params.keyword && this.props.match.params.keyword !== nextProps.match.params.keyword) {
      dispatch(searchMovieList(nextProps.match.params.keyword));
    }
    if (!nextProps.match.params.keyword) {
      dispatch(fetchMovieList());
    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.match.movies !== nextProps.movies) {
      return true;
    }
    return false;
  }

  render() {

    const { movies } = this.props;
    if (movies.length > 0) {
      return (
        <div>
          <Container>
            <Row>
              <AppHeader />
              <SearchBar />
            </Row>
          </Container>
          <div className={styles.container}>
            <MovieTable movies={movies} />
          </div>
        </div>
      );
    } else {
      return (<div />);
    }
  }
}

function mapStateToProps(state, ownProps) {
  const { movieList } = state;
  const { isFetcing_movieList, items: movies, error_movieList } = movieList;

  const keyword = ownProps.match.params.keyword;
  return { movies, keyword }
}

export default connect(mapStateToProps)(MovieList);