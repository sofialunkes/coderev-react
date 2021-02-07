import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import ReactTooltip from "react-tooltip";

function HeaderLoggedIn() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleLogout() {
    appDispatch({ type: "logout" });
    appDispatch({ type: "flashMessage", value: "Deslogado com sucesso." });
  }
  return (
    <div className="flex-row my-3 my-md-0">
      <Link data-for="profile" data-tip="My Profile" to={`/profile/${appState.user.nickname}`} className="mr-2">
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <ReactTooltip place="bottom" id="profile" className="custom-tooltip" />{" "}
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sair
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
