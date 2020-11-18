import React, { useContext, useEffect, useState } from "react";
import Page from "./Page";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Axios from "axios";
import { useImmer } from "use-immer";

function Home() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const [isLoading, setIsLoading] = useState(true);

  const [state, setState] = useImmer({
    userId: null,
    totemId: null,
    passTotemRequestCount: 0,
    finishTotemRequestCount: 0
  });

  const [revision, setRevision] = useImmer({
    totens: [],
    revisors: [],
    getTotensRequestCount: 0,
    getRevisorsRequestCount: 0
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchTotens() {
      try {
        const response = await Axios.get("/totems", { headers: { Authorization: appState.user.token } }, { cancelToken: ourRequest.token });
        setRevision(draft => {
          draft.totens = response.data;
        });
      } catch (e) {
        console.log(e.response);
      }
    }

    fetchTotens();

    return () => {
      ourRequest.cancel();
    };
  }, []);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchRevisors() {
      try {
        const response = await Axios.get("/revisors", { headers: { Authorization: appState.user.token } }, { cancelToken: ourRequest.token });
        setRevision(draft => {
          draft.revisors = response.data;
        });
        setIsLoading(false);
      } catch (e) {
        console.log(e.response);
      }
    }

    fetchRevisors();

    return () => {
      ourRequest.cancel();
    };
  }, [state.finishTotemRequestCount]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const options = {
      headers: { Authorization: appState.user.token },
      cancelToken: ourRequest.token
    };
    async function fetchRevision() {
      try {
        if (state.passTotemRequestCount > 0) {
          const response = await Axios.post("/revisors/nextRevisor", state, options);
          setState(draft => {
            draft.userId = null;
            draft.totemId = null;
            draft.passTotemRequestCount = 0;
            draft.finishTotemRequestCount++;
          });
          appDispatch({ type: "flashMessage", value: "Totem atualizado." });
        }
      } catch (e) {
        console.log(e.response.data);
        appDispatch({ type: "flashMessage", behavior: "error", value: "Verifique se o revisor já possui um totem." });
      }
    }

    fetchRevision();

    return () => {
      ourRequest.cancel();
    };
  }, [state.passTotemRequestCount]);

  if (isLoading) {
    return <LoadingDotsIcon />;
  }

  function handleChangeRevisor(totem, revisor) {
    setState(draft => {
      draft.userId = revisor._id;
      draft.totemId = totem._id;
      draft.passTotemRequestCount++;
    });
  }

  return (
    <Page title="Totens">
      {revision.totens.length > 0 && (
        <>
          <div className="row">
            {revision.totens.map(totem => {
              return (
                <div className="col" key={totem._id}>
                  <h3 className="text-center" style={{ color: totem.color }}>
                    {totem.name}
                  </h3>
                  <ul className="list-group">
                    {revision.revisors.map(revisor => {
                      return (
                        <li className="list-group-item" key={revisor._id}>
                          <div className="form-check">
                            <input onChange={() => handleChangeRevisor(totem, revisor)} className="form-check-input" type="checkbox" value={revisor._id + totem._id} id={`defaultCheck${revisor._id}`} checked={revisor.totemId == totem._id} />
                            <label className="form-check-label" htmlFor={`defaultCheck${revisor._id + totem._id}`}>
                              {revisor.name}
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Page>
  );
}

export default Home;
