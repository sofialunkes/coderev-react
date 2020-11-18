import React, { useContext, useEffect, useState } from "react";
import StateContext from "../StateContext";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import Page from "./Page";

function ResetPassword(props) {
  const appState = useContext(StateContext);
  const [password, setPassword] = useState("");
  const [submitPassword, setSubmitPassword] = useState(0);

  function handleSubmit() {
    if (password != "" && submitPassword == 0) {
      setSubmitPassword(submitPassword + 1);
    }
  }

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPinAuthentication() {
      try {
        const response = await Axios.post("/reset/password/newPassword", { password }, { headers: { Authorization: appState.tokenTemp } });

        if (response) {
          props.history.push("/");
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (submitPassword != 0) {
      fetchPinAuthentication();
    }

    return () => ourRequest.cancel();
  }, [submitPassword]);

  return (
    <Page title="Nova Senha">
      <h1> Nova Senha</h1>
      <p>Insira uma nova senha para que seja possivel fazer o login novamente :)</p>
      <div className="row mt-5">
        <div className="form-signin offset-md-4 col-md-4">
          <label htmlFor="inputPassword" className="sr-only">
            Senha
          </label>
          <input
            onChange={e => {
              setPassword(e.target.value);
            }}
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Senha"
            required
          />
          <button className="btn btn-md btn-primary btn-block mt-1" onClick={handleSubmit}>
            Confirmar Nova Senha
          </button>
        </div>
      </div>
    </Page>
  );
}

export default withRouter(ResetPassword);
