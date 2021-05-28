import React, { useContext, useEffect, useState } from "react";
import Page from "./Page";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Axios from "axios";
import { useImmer } from "use-immer";

function Home() {
  return (
    <Page title="Home">
      <div className="row">
        <h1> Ultimas mudanças criadas</h1>
        <div>
          <ul>
            <li>
              odete-account v1.44.1 atualização para 27/05/2021 as 8h30 por Sofia Lunkes da Silva. <small>criado às 17:50 26/07/2021 </small>
            </li>
            <li>
              cb-partner-events v1.9.3 atualização para 28/05/2021 as 8h30 por Antonio Pereira. <small>criado às 10:50 27/07/2021 </small>
            </li>
            <li>
              cb-payment-account v1.2 atualização para 28/05/2021 as 8h30 por Alan Magalhães Lira. <small>criado às 10:54 27/07/2021 </small>
            </li>
            <li>
              odete-proposalengine v1.9.43 atualização para 28/05/2021 as 8h30 por Eduardo Miani. <small>criado às 11:00 27/07/2021 </small>
            </li>
          </ul>
        </div>
      </div>

      <div className="row">
        <h1 className="col-12"> Ultimos totens</h1>
        <div>
          <ul>
            <li>Totem Vermelho passou de Luiza para Fernando</li>
            <li>Totem Azul passou de José para Sofia</li>
            <li>Totem Roxo passou de Vitor para Lucas</li>
            <li>Totem Verde passou de Marcelo para Antonio</li>
          </ul>
        </div>
      </div>
    </Page>
  );
}

export default Home;
