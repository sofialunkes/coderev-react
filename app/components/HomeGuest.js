import React, { useState, useEffect, useContext } from "react";
import Page from "./Page";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import { CSSTransition } from "react-transition-group";
import DispatchContext from "../DispatchContext";

function HomeGuest() {
  const appDispatch = useContext(DispatchContext);
  const initialState = {
    name: {
      value: "",
      hasErrors: false,
      message: ""
    },
    email: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0
    },
    password: {
      value: "",
      hasErrors: false,
      message: ""
    },
    scope: {
      value: "",
      hasErrors: false,
      message: ""
    },
    submitCount: 0
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "nameImmediately":
        draft.name.hasErrors = false;
        draft.name.value = action.value;
        if (draft.name.value && !/^(([a-zA-Zà-ùÀ-Ù]+)(\ )?){0,7}$/.test(draft.name.value)) {
          draft.name.hasErrors = true;
          draft.name.message = "Nome deve conter apenas letras e espaços.";
        }
        return;
      case "nameAfterDelay":
        if (draft.name.value.length < 5) {
          draft.name.hasErrors = true;
          draft.name.message = "Nome deve conter no minimo 5 caracteres.";
        }
        return;
      case "emailImmediately":
        draft.email.hasErrors = false;
        draft.email.value = action.value;
        return;
      case "emailAfterDelay":
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true;
          draft.email.message = "Você deve inserir um email válido e utilizado no slack.";
        }
        if (!draft.email.hasErrors && !action.noRequest) {
          draft.email.checkCount++;
        }
        return;
      case "emailUniqueResults":
        if (action.value) {
          draft.email.hasErrors = true;
          draft.email.isUnique = false;
          draft.email.message = "Esse email já esta sendo usado.";
        } else {
          draft.email.isUnique = true;
        }
        return;
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
      case "scopeImmediately":
        draft.scope.hasErrors = false;
        draft.scope.value = action.value;
        if (draft.scope.value == "") {
          draft.scope.hasErrors = true;
          draft.scope.message = "Escopo de revisao deve ser escolhido.";
        }
        return;
      case "submitForm":
        if (!draft.name.hasErrors && !draft.email.hasErrors && draft.email.isUnique && !draft.password.hasErrors && !draft.scope.hasErrors) {
          draft.submitCount++;
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.name.value) {
      const delay = setTimeout(() => dispatch({ type: "nameAfterDelay" }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.name.value]);

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => dispatch({ type: "emailAfterDelay" }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.email.value]);

  useEffect(() => {
    if (state.password.value) {
      const delay = setTimeout(() => dispatch({ type: "passwordAfterDelay" }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.password.value]);

  useEffect(() => {
    if (state.email.checkCount) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await Axios.post("/doesEmailExist", { email: state.email.value }, { cancelToken: ourRequest.token });
          dispatch({ type: "emailUniqueResults", value: response.data });
        } catch (e) {
          console.log(e.response.data);
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, [state.email.checkCount]);

  useEffect(() => {
    if (state.submitCount) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await Axios.post("/register", { name: state.name.value, email: state.email.value, password: state.password.value, scope: state.scope.value }, { cancelToken: ourRequest.token });
          appDispatch({ type: "login", data: response.data });
          appDispatch({ type: "flashMessage", value: "Bem-vindo a sua conta. #bala " });
        } catch (e) {
          console.log(e.response.data);
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, [state.submitCount]);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: "nameImmediately", value: state.name.value });
    dispatch({ type: "nameAfterDelay", value: state.name.value, noRequest: true });
    dispatch({ type: "emailImmediately", value: state.email.value });
    dispatch({ type: "emailAfterDelay", value: state.email.value, noRequest: true });
    dispatch({ type: "passwordImmediately", value: state.password.value });
    dispatch({ type: "passwordAfterDelay", value: state.password.value });
    dispatch({ type: "scopeImmediately", value: state.scope.value });

    dispatch({ type: "submitForm" });
  }

  return (
    <Page title="Welcome!" wide={true}>
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <h1 className="display-3">Entregue Código &#128640;</h1>
          <p className="lead text-muted">Pensando na melhoria nosso ciclo de entrega de códigos, o CodeRev veio ajudar a repassar nossos totens. Não se acanhe, código revisado ajuda não entregar bugs! &#128539;</p>
        </div>

        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name-register" className="text-muted mb-1">
                <small>Nome</small>
              </label>
              <input onChange={e => dispatch({ type: "nameImmediately", value: e.target.value })} id="name-register" name="name" className="form-control" type="text" placeholder="Insira seu nome" autoComplete="off" />
              <CSSTransition in={state.name.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.name.message}</div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input onChange={e => dispatch({ type: "emailImmediately", value: e.target.value })} id="email-register" name="email" className="form-control" type="text" placeholder="voce@itau-unibanco.com.br" autoComplete="off" />
              <CSSTransition in={state.email.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.email.message}</div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Senha</small>
              </label>
              <input onChange={e => dispatch({ type: "passwordImmediately", value: e.target.value })} id="password-register" name="password" className="form-control" type="password" placeholder="Crie uma senha" />
              <CSSTransition in={state.password.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.password.message}</div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <div className="text-muted mb-1">
                <small>Escopo</small>
              </div>
              <div className="form-control form-checkbox-guest">
                <div className="form-check form-check-inline">
                  <input onChange={e => dispatch({ type: "scopeImmediately", value: e.target.value })} className="form-check-input" type="checkbox" id="inlineCheckbox1" value="backend" checked={state.scope.value == "backend"} />
                  <label className="form-check-label text-muted" htmlFor="inlineCheckbox1">
                    backend
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input onChange={e => dispatch({ type: "scopeImmediately", value: e.target.value })} className="form-check-input" type="checkbox" id="inlineCheckbox2" value="frontend" checked={state.scope.value == "frontend"} />
                  <label className="form-check-label text-muted" htmlFor="inlineCheckbox2">
                    frontend
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input onChange={e => dispatch({ type: "scopeImmediately", value: e.target.value })} className="form-check-input" type="checkbox" id="inlineCheckbox3" value="infra" checked={state.scope.value == "infra"} />
                  <label className="form-check-label text-muted" htmlFor="inlineCheckbox3">
                    infra
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input onChange={e => dispatch({ type: "scopeImmediately", value: e.target.value })} className="form-check-input" type="checkbox" id="inlineCheckbox4" value="viewer" checked={state.scope.value == "viewer"} />
                  <label className="form-check-label text-muted" htmlFor="inlineCheckbox4">
                    viewer
                  </label>
                </div>
              </div>
              <CSSTransition in={state.scope.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.scope.message}</div>
              </CSSTransition>
            </div>
            <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
              Cadastre-se no CodeReview
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
}
export default HomeGuest;
