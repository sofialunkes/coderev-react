import React from "react";
import Page from "./Page";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Page title="Not Found">
      <div className="text-center">
        <h2> Ooopa, página não encontrada.</h2>
        <p className="lead text-muted">
          Se quiser, você pode voltar a <Link to="/">página inicial</Link> pra começar de novo.
        </p>
      </div>
    </Page>
  );
}

export default NotFound;
