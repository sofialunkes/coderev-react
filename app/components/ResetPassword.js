import React, { useContext, useEffect, useState } from "react";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import { withRouter } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import { CSSTransition } from "react-transition-group";
import Axios from "axios";
import Page from "./Page";

function ResetPassword(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const initialState = {
    password: {
      value: "",
      hasErrors: false,
      message: ""
    },
    submitCount: 0
  };

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  function ourReducer(draft, action) {
    switch (action.type) {
      case "passwordImmediately":
        draft.password.hasErrors = false;
        draft.password.value = action.value;
        if (draft.password.value.length > 50) {
          draft.password.hasErrors = true;
          draft.password.message = "Senha não pode exceder 50 caracteres.";
        }
        return;
      case "passwordAfterDelay":
        if (draft.password.value.length < 6) {
          draft.password.hasErrors = true;
          draft.password.message = "Senha deve conter no minimo 6 caracteres.";
        }
        return;
      case "submitPassword":
        if (!draft.password.hasErrors) {
          draft.submitCount++;
        }
        return;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "passwordImmediately", value: state.password.value });
    dispatch({ type: "passwordAfterDelay", value: state.password.value });

    dispatch({ type: "submitPassword" });
  }

  useEffect(() => {
    if (state.password.value) {
      const delay = setTimeout(() => dispatch({ type: "passwordAfterDelay" }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.password.value]);

  useEffect(() => {
    if (state.submitCount) {
      const ourRequest = Axios.CancelToken.source();

      async function fetchPinAuthentication() {
        try {
          const response = await Axios.post("/reset/password/newPassword", { password: state.password.value }, { headers: { Authorization: appState.tokenTemp } });

          if (response) {
            appDispatch({ type: "flashMessage", value: "Senha alterada com sucesso." });
            props.history.push("/");
          }
        } catch (e) {
          console.log(e);
        }
      }

      fetchPinAuthentication();

      return () => ourRequest.cancel();
    }
  }, [state.submitCount]);

  return (
    <Page title="Nova Senha">
      <h1> Nova Senha</h1>
      <p>Insira uma nova senha para que seja possivel fazer o login novamente :)</p>
      <div className="row mt-5">
        <div className="form-signin offset-md-4 col-md-4">
          <label htmlFor="password-register" className="text-muted mb-1">
            <small>Senha</small>
          </label>
          <input onChange={e => dispatch({ type: "passwordImmediately", value: e.target.value })} id="password-register" name="password" className="form-control" type="password" placeholder="Crie uma senha" />
          <CSSTransition in={state.password.hasErrors} timeout={330} classNames="cssPasswordReset" unmountOnExit>
            <div className="alert alert-danger cssPasswordReset">{state.password.message}</div>
          </CSSTransition>
          <button className="btn btn-md btn-primary btn-block mt-1" onClick={handleSubmit}>
            Confirmar Nova Senha
          </button>
        </div>
      </div>
    </Page>
  );
}

export default withRouter(ResetPassword);
