import MovieList from "../components/movieSearch";
import { Provider } from "mobx-react";
import Favorite from "../store/favoriteStore";
import Navbar from "../components/navbar";

export default function index() {
  return (
    <Provider Favorite={Favorite}>
      <Navbar />
      <MovieList />
    </Provider>
  );
}
