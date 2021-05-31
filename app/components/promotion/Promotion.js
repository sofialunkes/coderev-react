import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import Page from "../Page";

function Promotion() {
  const initialState = {
    service: {
      value: "",
      hasErrors: false,
      message: ""
    },
    date: {
      value: ""
    },
    squad: {
      value: "",
      hasErrors: false,
      message: ""
    },
    repository: {
      value: "",
      hasErrors: false,
      message: ""
    },
    version: {
      value: "",
      hasErrors: false,
      message: ""
    },
    motivation: {
      value: "",
      hasErrors: false,
      message: ""
    },
    dateStart: {
      value: "",
      hasErrors: false,
      message: ""
    },
    dateFinish: {
      value: "",
      hasErrors: false,
      message: ""
    },
    responsible: {
      value: "",
      hasErrors: false,
      message: ""
    },
    racf: {
      value: "",
      hasErrors: false,
      message: ""
    },
    jira: {
      value: "",
      hasErrors: false,
      message: ""
    },
    description: {
      value: "",
      hasErrors: false,
      message: ""
    },
    components: {
      value: "",
      hasErrors: false,
      message: ""
    },
    impact: {
      value: "",
      hasErrors: false,
      message: ""
    },
    probability: {
      value: "",
      hasErrors: false,
      message: ""
    },
    rollbackPlan: {
      value: "",
      hasErrors: false,
      message: ""
    },
    submitCount: 0
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "serviceImmediately":
        draft.service.hasErrors = false;
        draft.service.value = action.value;
        return;
      case "dateImmediately":
        draft.date.value = new Date().toJSON();
        console.log(draft.date.value);
        return;
      case "squadImmediately":
        draft.squad.hasErrors = false;
        draft.squad.value = action.value;
        return;
      case "repositoryImmediately":
        draft.repository.hasErrors = false;
        draft.repository.value = action.value;
        return;
      case "versionImmediately":
        draft.version.hasErrors = false;
        draft.version.value = action.value;
        return;
      case "motivationImmediately":
        draft.motivation.hasErrors = false;
        draft.motivation.value = action.value;
        return;
      case "dateStartImmediately":
        draft.dateStart.hasErrors = false;
        draft.dateStart.value = action.value;
        if (draft.dateStart.value == null) {
          draft.dateStart.hasErrors = true;
          draft.dateStart.message = "Data de inicio deve ser preenchida.";
        }
        return;
      case "dateFinishImmediately":
        draft.dateFinish.hasErrors = false;
        draft.dateFinish.value = action.value;
        if (draft.dateFinish.value < draft.dateStart.value && draft.dateStart.value != null) {
          draft.dateFinish.hasErrors = true;
          draft.dateFinish.message = "Data de término menor que a data de inicio.";
        }
        return;
      case "responsibleImmediately":
        draft.responsible.hasErrors = false;
        draft.responsible.value = action.value;
        return;
      case "racfImmediately":
        draft.racf.hasErrors = false;
        draft.racf.value = action.value;
        return;
      case "jiraImmediately":
        draft.jira.hasErrors = false;
        draft.jira.value = action.value;
        return;
      case "descriptionImmediately":
        draft.description.hasErrors = false;
        draft.description.value = action.value;
        return;
      case "componentsImmediately":
        draft.components.hasErrors = false;
        draft.components.value = action.value;
        return;
      case "impactImmediately":
        draft.impact.hasErrors = false;
        draft.impact.value = action.value;
        return;
      case "probabilityImmediately":
        draft.probability.hasErrors = false;
        draft.probability.value = action.value;
        return;
      case "rollbackImmediately":
        draft.rollbackPlan.hasErrors = false;
        draft.rollbackPlan.value = action.value;
        return;
      case "submitForm":
        console.log(draft);
        draft.submitCount++;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.submitCount) {
      console.log(state);
    }
  }, [state.submitCount]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "dateImmediately" });
    dispatch({ type: "submitForm" });
  }

  return (
    <Page title="Promotion">
      <h1>Promotion</h1>
      <div className="card">
        <div className="card-header">Descrição da mudança</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <label htmlFor="inputServico" className="col-sm-2 col-form-label">
                Serviço
              </label>
              <div className="col-sm-9">
                <input
                  onChange={e => {
                    dispatch({ type: "serviceImmediately", value: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="inputServico"
                  placeholder="ex. cb-projeto"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputSquad" className="col-sm-2 col-form-label">
                Squad
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  onChange={e => {
                    dispatch({ type: "squadImmediately", value: e.target.value });
                  }}
                  className="form-control"
                  id="inputSquad"
                  placeholder="Assistir, Conectar, Cross, Conectar.."
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputRepositorio" className="col-sm-2 col-form-label">
                Repositório
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  onChange={e => {
                    dispatch({ type: "repositoryImmediately", value: e.target.value });
                  }}
                  className="form-control"
                  id="inputRepositorio"
                  placeholder="/gif-odete/backend/odete-account "
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputVersao" className="col-sm-2 col-form-label">
                Versão
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  onChange={e => {
                    dispatch({ type: "versionImmediately", value: e.target.value });
                  }}
                  className="form-control"
                  id="inputVersao"
                  placeholder="1.4.2"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputMotivacao" className="col-sm-2 col-form-label">
                Motivação
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  onChange={e => {
                    dispatch({ type: "motivationImmediately", value: e.target.value });
                  }}
                  className="form-control"
                  id="inputMotivacao"
                  placeholder="Ajuste de data de evento de payload"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputInicio" className="col-sm-2 col-form-label">
                Início
              </label>
              <div className="col-sm-4">
                <input
                  type="datetime-local"
                  onChange={e => {
                    dispatch({ type: "dateStartImmediately", value: e.target.value });
                  }}
                  className="form-control"
                  id="inputInicio"
                />
              </div>
              <label htmlFor="inputTermino" className="col-sm-2 col-form-label">
                Término
              </label>
              <div className="col-sm-3">
                <input
                  type="datetime-local"
                  onChange={e => {
                    dispatch({ type: "dateFinishImmediately", value: e.target.value });
                  }}
                  className="form-control"
                  id="inputTermino"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputResponsavel" className="col-sm-2 col-form-label">
                Responsável
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  onChange={e => {
                    dispatch({ type: "responsibleImmediately", value: e.target.value });
                  }}
                  className="form-control"
                  id="inputResponsavel"
                  placeholder="Jane Foster"
                />
              </div>
              <label htmlFor="inputRacf" className="col-sm-2 col-form-label">
                RACF
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  onChange={e => {
                    dispatch({ type: "racfImmediately", value: e.target.value });
                  }}
                  className="form-control"
                  id="inputRacf"
                  placeholder="RACF"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputJira" className="col-sm-2 col-form-label">
                JIRA
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  onChange={e => {
                    dispatch({ type: "jiraImmediately", value: e.target.value });
                  }}
                  className="form-control"
                  id="inputJira"
                  placeholder="https://projetoodete.atlassian.net/browse/CB-00001"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputDescricao" className="col-sm-2 col-form-label">
                Descricao
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  onChange={e => {
                    dispatch({ type: "descriptionImmediately", value: e.target.value });
                  }}
                  className="form-control"
                  id="inputDescricao"
                  placeholder="Descricao do que foi alterado"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputComponentes" className="col-sm-2 col-form-label">
                Componentes
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  onChange={e => {
                    dispatch({ type: "componentsImmediately", value: e.target.value });
                  }}
                  className="form-control"
                  id="inputComponentes"
                  placeholder="Nenhum"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="selectImpacto" className="col-sm-2 col-form-label">
                Potencial Impacto
              </label>
              <div className="col-sm-4">
                <select
                  id="selectImpacto"
                  value={state.impact.value}
                  onChange={e => {
                    dispatch({ type: "impactImmediately", value: e.target.value });
                  }}
                  className="form-control"
                >
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
                <select
                  id="selectProbabilidade"
                  value={state.probability.value}
                  onChange={e => {
                    dispatch({ type: "probabilityImmediately", value: e.target.value });
                  }}
                  className="form-control"
                >
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
                <input
                  type="text"
                  onChange={e => {
                    dispatch({ type: "rollbackImmediately", value: e.target.value });
                  }}
                  className="form-control"
                  id="inputRollback"
                  placeholder="Nenhum"
                />
              </div>
            </div>
            <div className="form-group row">
              <button type="submit" className="col-4 offset-4 py-2 mt-4 btn btn-lg btn-success">
                Criar promotion
              </button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default withRouter(Promotion);
