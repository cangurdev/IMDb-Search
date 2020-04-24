import { observable, action } from "mobx";

class Favorite {
  @observable favorites = [];
  @action
  addFavorite(fav) {
    this.favorites.push(fav);
    localStorage.setItem(fav.imdbID, JSON.stringify(fav));
  }
  @action
  removeFavorite(fav) {
    localStorage.removeItem(fav);
  }
  @action
  favoritesChange() {
    const keys = Object.keys(localStorage);
    this.favorites = [];
    keys.map((key) =>
      this.favorites.push(JSON.parse(localStorage.getItem(key)))
    );
  }
}

export default new Favorite();
