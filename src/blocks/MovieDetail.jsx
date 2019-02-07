import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchMovieDetail } from '../actions';
import { Image } from 'react-bootstrap'
import { URL_IMG, IMG_SIZE_LARGE } from '../const'
import { Container, Row, Col } from 'react-bootstrap';
import Poster from '../components/Poster';
import styles from './MovieDetail.module.css';

class MovieDetail extends Component {

  static contextTypes = {
    router: () => React.PropTypes
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMovieDetail(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.match.params.id && this.props.match.params.id !== nextProps.match.params.id) {
      dispatch(fetchMovieDetail(nextProps.match.params.id));
    }
  }

  render() {
    const { movie, isFetching } = this.props;

    if (isFetching) {
      return <p>loading...</p>
    }
    if (movie.hasOwnProperty('id')) {
      return (
        <div>
          <Container fluid="true" className={styles.container}>
            <Row>
              <Col className="p-0">
                <div className={styles.header}>
                  <div className={styles.banner}>
                    <Image className="img-fluid" key={movie.id} src={URL_IMG + IMG_SIZE_LARGE + movie.backdrop_path} responsive="true" />
                  </div>

                  <button
                    className={styles.back}
                    onClick={this.context.router.history.goBack}>
                    <span className="fa fa-arrow-left"></span>
                  </button>
                </div>

              </Col>
            </Row>
            <Row>
              <Col xs="12">

                <div className="w-100 text-left">
                  <div className={styles.cover}>
                    <Poster info id={movie.id} path={movie.poster_path} title={movie.title} responsive />
                  </div>
                  <div className={styles.infopanel}>
                  <h2 className={styles.title}>{movie.title}</h2>
                  <p>{new Date(movie.release_date.toString()).getFullYear()}  •  {movie.vote_average * 10}% User Score</p>
                  <p>{Math.floor(movie.runtime / 60)}h {(((movie.runtime / 60) - Math.floor(movie.runtime / 60)) * 60).toFixed()} min</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className={styles.hr}></div>
                <h4 className={styles.subtitle}>Overview</h4>
                <p className={styles.overview}>{movie.overview}</p>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else
      return null;

  }
}

function mapStateToProps(state) {
  const { movieDetail } = state;
  const { isFetching, item: movie, error_movie } = movieDetail;

  return { isFetching, movie, error_movie }
}

export default connect(mapStateToProps)(MovieDetail);