import MyComp from "../components/favorites";
import Favorite from "../store/favoriteStore";
import { Provider } from "mobx-react";
import Navbar from "../components/navbar";

export default function favorites() {
  return (
    <Provider Favorite={Favorite}>
      <Navbar />
      <MyComp />
    </Provider>
  );
}
