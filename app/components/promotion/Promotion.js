import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Page from "../Page";

function Promotion() {
  return (
    <Page title="Promotion">
      <h1>Promotion</h1>
      <div className="card">
        <div className="card-header">Descreva a mudança</div>
        <div className="card-body">
          <form>
            <div className="form-group row">
              <label htmlFor="inputServico" className="col-sm-2 col-form-label">
                Serviço
              </label>
              <div className="col-sm-5">
                <input type="text" className="form-control" id="inputServico" placeholder="ex. cb-cbzito" />
              </div>
              <label htmlFor="dataMudanca" className="col-sm-1 col-form-label">
                Data
              </label>
              <div className="col-sm-3">
                <input type="date" className="form-control" id="dataMudanca" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputSquad" className="col-sm-2 col-form-label">
                Squad
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputSquad" placeholder="Assistir, Conectar, Cross, Conectar.." />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputRepositorio" className="col-sm-2 col-form-label">
                Repositório
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputRepositorio" placeholder="/gif-odete/backend/odete-account " />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputVersao" className="col-sm-2 col-form-label">
                Versão
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputVersao" placeholder="1.4.2" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputMotivacao" className="col-sm-2 col-form-label">
                Motivação
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputMotivacao" placeholder="Ajuste de data de evento de payload" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputInicio" className="col-sm-2 col-form-label">
                Início
              </label>
              <div className="col-sm-4">
                <input type="datetime-local" className="form-control" id="inputInicio" />
              </div>
              <label htmlFor="inputTermino" className="col-sm-2 col-form-label">
                Término
              </label>
              <div className="col-sm-3">
                <input type="datetime-local" className="form-control" id="inputTermino" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputResponsavel" className="col-sm-2 col-form-label">
                Responsável
              </label>
              <div className="col-sm-4">
                <input type="text" className="form-control" id="inputResponsavel" placeholder="Jane Foster" />
              </div>
              <label htmlFor="inputRacf" className="col-sm-2 col-form-label">
                RACF
              </label>
              <div className="col-sm-3">
                <input type="text" className="form-control" id="inputRacf" placeholder="RACF" />
              </div>
            </div>
            <div className="form-group row"></div>
            <div className="form-group row">
              <label htmlFor="inputJira" className="col-sm-2 col-form-label">
                JIRA
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputJira" placeholder="https://projetoodete.atlassian.net/browse/CB-00001" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputDescricao" className="col-sm-2 col-form-label">
                Descricao
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputDescricao" placeholder="Descricao do que foi alterado" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputComponentes" className="col-sm-2 col-form-label">
                Componentes
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputComponentes" placeholder="Nenhum" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="selectImpacto" className="col-sm-2 col-form-label">
                Potencial Impacto
              </label>
              <div className="col-sm-4">
                <select id="selectImpacto" className="form-control">
                  <option value="nenhum">Nenhum</option>
                  <option value="baixo">Baixo</option>
                  <option value="medio">Médio</option>
                  <option value="alto">Alto</option>
                </select>
              </div>
              <label htmlFor="selectProbabilidade" className="col-sm-2 col-form-label">
                Probabilidade
              </label>
              <div className="col-sm-3">
                <select id="selectProbabilidade" className="form-control">
                  <option value="nenhum">Nenhum</option>
                  <option value="baixo">Baixo</option>
                  <option value="medio">Médio</option>
                  <option value="alto">Alto</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputRollback" className="col-sm-2 col-form-label">
                Plano de Rollback
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="inputRollback" placeholder="Nenhum" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default withRouter(Promotion);
