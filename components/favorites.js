import React from "react";
import { observer, inject } from "mobx-react";
import Favorite from "../store/favoriteStore";
import MovieCard from "./movieCard";
import "../style/style.scss";
@inject("Favorite")
@observer
class MyComp extends React.Component {
  render() {
    return (
      <div className="container text-center rowC">
        {Favorite.favorites.map((favorite) => (
          <MovieCard movie={favorite} key={favorite.imdbID} />
        ))}
      </div>
    );
  }
}

export default MyComp;
