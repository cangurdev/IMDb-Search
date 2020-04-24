import "../style/style.scss";
import { observer, inject } from "mobx-react";
import Favorite from "../store/favoriteStore";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Feedback from "./feedback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import config from "../config.js";
@inject("Favorite")
@observer
class MovieCard extends React.Component {
  state = {
    movieData: {},
    show: false,
    isFavorite: false,
    operation: "",
    favoriteChange: false,
  };
  componentDidMount() {
    if (localStorage.getItem(this.props.movie.imdbID) !== null) {
      this.setState({ isFavorite: true });
    }
  }
  addFav = () => {
    if (Object.keys(this.state.movieData).length === 0) {
      this.fetchMovie();
    }
    setTimeout(() => {
      Favorite.addFavorite(this.state.movieData);
      this.setState({ favoriteChange: true, operation: "favorite" });
    }, 500);
    setTimeout(() => {
      this.setState({ favoriteChange: false });
    }, 3000);
    this.setState({ isFavorite: true });
  };
  removeFav = () => {
    Favorite.removeFavorite(this.props.movie.imdbID);
    this.setState({
      isFavorite: false,
      operation: "remove",
      favoriteChange: true,
    });
    Favorite.favoritesChange();

    setTimeout(() => {
      this.setState({ favoriteChange: false });
    }, 3000);
  };

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  fetchMovie = () => {
    fetch(
      `https://www.omdbapi.com/?apikey=${config.API_KEY}&i=${this.props.movie.imdbID}&plot=full`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          movieData: res,
        });
      });
  };
  showDetail = () => {
    this.fetchMovie();
    setTimeout(() => {
      this.setState({ show: true });
    }, 300);
  };
  render() {
    const { Title, Poster, Year } = this.props.movie;
    const {
      imdbRating,
      Metascore,
      Released,
      Genre,
      Actors,
      Awards,
    } = this.state.movieData;
    const solidFavIcon = <FontAwesomeIcon icon={fasHeart} />;
    const regularFavIcon = <FontAwesomeIcon icon={farHeart} />;
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={Poster === "N/A" ? "/notfound.png" : Poster}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{Title}</h5>
          <p className="card-text">Year: {Year} </p>
          <button
            onClick={this.state.isFavorite ? this.removeFav : this.addFav}
            className="btn buttonColor"
          >
            {this.state.isFavorite ? solidFavIcon : regularFavIcon}
          </button>
          <button onClick={this.showDetail} className="btn buttonColor">
            Details
          </button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <h2>{Title}</h2>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col>
                  <img src={Poster === "N/A" ? "/notfound.png" : Poster} />
                </Col>
                <Col>
                  <h5>Released</h5>
                  <p> {Released}</p>
                  <h5>IMDb rating</h5>
                  <p> {imdbRating}</p>
                  <h5>Metascore</h5>
                  <p>{Metascore === "N/A" ? "No Metascore" : Metascore}</p>
                  <h5>Actors</h5>
                  <p>{Actors}</p>
                  <h5>Genre</h5>
                  <p> {Genre}</p>
                  <h5>Awards</h5>
                  <p> {Awards === "N/A" ? "No Awards" : Awards}</p>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn buttonColor" onClick={this.handleClose}>
                Close
              </Button>
              <Button
                onClick={this.state.isFavorite ? this.removeFav : this.addFav}
                className="btn buttonColor"
              >
                {this.state.isFavorite ? solidFavIcon : regularFavIcon}
              </Button>
            </Modal.Footer>
          </Modal>
          <Feedback
            title={Title}
            show={this.state.favoriteChange}
            operation={this.state.operation}
          />
        </div>
      </div>
    );
  }
}

export default MovieCard;
