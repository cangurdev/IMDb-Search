import fetch from "node-fetch";
import MovieCard from "./movieCard";
import "../style/style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Favorite from "../store/favoriteStore";
import { observer } from "mobx-react";
import API_KEY from "../config";
@observer
class MoviesList extends React.Component {
  state = {
    moviesList: [],
    searchTerm: "",
  };
  componentDidMount() {
    Favorite.favoritesChange();
  }

  search = (event) => {
    event.preventDefault();
    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${this.state.searchTerm}&type=movie`
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.Search) {
          this.setState({ moviesList: [] });
          return;
        }
        const moviesList = res.Search;
        this.setState({
          moviesList,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };
  render() {
    const { moviesList } = this.state;
    const searchIcon = <FontAwesomeIcon icon={faSearch} />;
    return (
      <div className="container text-center">
        <div className="searchButton">
          <form onSubmit={this.search}>
            <input
              placeholder="Enter a movie title"
              onChange={this.handleChange}
            />
            <button type="submit" className="btn buttonColor">
              {searchIcon}
            </button>
          </form>
        </div>

        <div className="rowC">
          {moviesList.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      </div>
    );
  }
}

export default MoviesList;
