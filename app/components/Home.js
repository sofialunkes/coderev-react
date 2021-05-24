import React, { useContext, useEffect, useState } from "react";
import Page from "./Page";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Axios from "axios";
import { useImmer } from "use-immer";

function Home() {
  return (
    <Page title="HomePage">
      <h1> Titulo!!</h1>
    </Page>
  );
}

export default Home;
