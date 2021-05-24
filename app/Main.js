import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useImmerReducer } from "use-immer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
Axios.defaults.baseURL = process.env.BACKEND_URL || "https://coderev-backend.herokuapp.com";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Footer from "./components/Footer";

import Home from "./components/Home";
import FlashMessages from "./components/FlashMessages";

import NotFound from "./components/NotFound";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("coderevToken")),
    flashMessages: [],
    tokenTemp: "",
    behavior: "",
    user: {
      token: localStorage.getItem("coderevToken"),
      email: localStorage.getItem("coderevEmail"),
      avatar: localStorage.getItem("coderevAvatar"),
      username: localStorage.getItem("coderevUsername")
    },
    isSearchOpen: false,
    isChatOpen: false,
    unreadChatCount: 0
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "resetPassword":
        draft.tokenTemp = action.value;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        draft.behavior = action.behavior;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("coderevToken", state.user.token);
      localStorage.setItem("coderevEmail", state.user.email);
      localStorage.setItem("coderevAvatar", state.user.avatar);
      localStorage.setItem("coderevUsername", state.user.username);
    } else {
      localStorage.removeItem("coderevToken");
      localStorage.removeItem("coderevEmail");
      localStorage.removeItem("coderevAvatar");
      localStorage.removeItem("coderevUsername");
    }
  }, [state.loggedIn]);

  useEffect(() => {
    if (state.loggedIn) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await Axios.post("/checkToken", { token: state.user.token }, { cancelToken: ourRequest.token });
          if (!response.data) {
            dispatch({ type: "logout" });
            dispatch({ type: "flashMessage", behavior: "info", value: "Sua sessão expirou. Por favor entre novamente." });
          }
        } catch (e) {
          console.log(e.response.data);
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} behavior={state.behavior} />
          <Header />
          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="/reset-password">
              <ResetPassword />
            </Route>
            <Route path="/profile/:username">
              <Profile />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

ReactDOM.render(<Main />, document.querySelector("#app"));

if (module.hot) {
  module.hot.accept();
}
