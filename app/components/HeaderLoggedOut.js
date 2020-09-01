import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import DispatchContext from "../DispatchContext";

function HeaderLoggedOut(props) {
  const appDispatch = useContext(DispatchContext);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setEmailEmpty(Boolean(!email.trim()));
      setPasswordEmpty(Boolean(!password.trim()));
    } else {
      try {
        const response = await Axios.post("/login", { email, password });
        if (response.data.token) {
          appDispatch({ type: "login", data: response.data });
          appDispatch({ type: "flashMessage", value: "Bem-vindo." });
        } else {
          appDispatch({ type: "flashMessage", behavior: "error", value: "Invalido email / senha." });
        }
      } catch (e) {
        console.log(e.response);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={e => {
              setEmail(e.target.value);
              setEmailEmpty(false);
            }}
            name="email"
            className={"form-control form-control-sm input-dark " + (emailEmpty ? "is-invalid" : "")}
            type="text"
            placeholder="Email"
            autoComplete="off"
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={e => {
              setPassword(e.target.value);
              setPasswordEmpty(false);
            }}
            name="password"
            className={"form-control form-control-sm input-dark " + (passwordEmpty ? "is-invalid" : "")}
            type="password"
            placeholder="Senha"
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Entrar</button>
        </div>
      </div>
    </form>
  );
}

export default HeaderLoggedOut;
