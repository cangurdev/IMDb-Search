import React from "react";
import Link from "next/link";
import Favorite from "../store/favoriteStore";
import { observer } from "mobx-react";
import "../style/style.scss";

@observer
class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link href="index">
            <a className="navbar-brand">IMDb Search</a>
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <Link href="favorites">
            <a href="favorites">Favorites({Favorite.favorites.length})</a>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
