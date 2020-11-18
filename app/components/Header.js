import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderLoggedOut from "./HeaderLoggedOut";
import HeaderLoggedIn from "./HeaderLoggedIn";
import StateContext from "../StateContext";

function Header(props) {
  const appState = useContext(StateContext);
  const headerContent = appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />;
  const location = useLocation().pathname;

  function showHeader() {
    if (location != "/forgot-password" && location != "/reset-password") {
      return !props.staticEmpty ? headerContent : "";
    }
    return "";
  }

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            CodeRev
          </Link>
        </h4>
        {showHeader()}
      </div>
    </header>
  );
}

export default Header;
