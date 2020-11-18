import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import Page from "./Page";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState(0);
  const [enablePin, setEnablePin] = useState(0);
  const [submitEmailRequest, setSubmitEmailRequest] = useState(0);
  const [submitPinCodeRequest, setSubmitPinCodeRequest] = useState(0);

  const appDispatch = useContext(DispatchContext);

  function handleSubmit() {
    if (email != "" && pin == 0 && submitEmailRequest == 0) {
      setSubmitEmailRequest(submitEmailRequest + 1);
    } else if (pin != 0 && submitPinCodeRequest == 0) {
      setSubmitPinCodeRequest(submitPinCodeRequest + 1);
    }
  }

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPinCode() {
      try {
        const response = await Axios.post("/reset/password/verifyEmail", { email });
        setTimeout(() => {
          setEnablePin(response);
        }, 300);
      } catch (e) {
        console.log(e.response.data);
      }
    }
    if (submitEmailRequest != 0) {
      fetchPinCode();
    }
    return () => ourRequest.cancel();
  }, [submitEmailRequest]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPinAuthentication() {
      try {
        const response = await Axios.post("/reset/password/verifyPin", { email, pin });
        if (response) {
          appDispatch({ type: "resetPassword", value: response.data.token });
          props.history.push("/reset-password");
        }
      } catch (e) {
        console.log(e.response.data);
      }
    }
    if (submitPinCodeRequest != 0) {
      fetchPinAuthentication();
    }

    return () => ourRequest.cancel();
  }, [submitPinCodeRequest]);

  return (
    <Page title="Recuperar Senha">
      <h1>Recuperar Senha</h1>
      <p>Para configurar uma senha nova, precisaremos que voce insira seu email cadastrado no slack abaixo, e insira o código de 6 digitos que foi enviado lá pelo bot codereview</p>
      <div className="row mt-5">
        <div className="form-signin offset-md-4 col-md-4">
          <label htmlFor="inputEmail" className="sr-only">
            Email
          </label>
          <input
            onChange={e => {
              setEmail(e.target.value);
            }}
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Endereço de email"
            required
          />
          {enablePin ? (
            <input
              onChange={e => {
                setPin(e.target.value);
              }}
              className="form-control mt-1"
              placeholder="Insira seu código"
            />
          ) : (
            ""
          )}

          <button className="btn btn-md btn-primary btn-block mt-1" onClick={handleSubmit}>
            Confirmar {enablePin ? "Código" : "Email"}
          </button>
        </div>
      </div>
    </Page>
  );
}

export default withRouter(ForgotPassword);
