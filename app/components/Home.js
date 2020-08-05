import React, { useContext, useEffect, useState } from "react";
import Page from "./Page";
import StateContext from "../StateContext";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Axios from "axios";

function Home() {
  const appState = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(true);
  const [totens, setTotens] = useState([]);
  const [revisors, setRevisors] = useState([]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchTotens() {
      try {
        const response = await Axios.get("/totems", { headers: { Authorization: appState.user.token } }, { cancelToken: ourRequest.token });
        setIsLoading(false);
        setTotens(response.data);
      } catch (e) {
        console.log("erro:");
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
        setRevisors(response.data);
      } catch (e) {
        console.log(e.response);
      }
    }

    fetchRevisors();

    return () => {
      ourRequest.cancel();
    };
  }, []);

  if (isLoading) {
    return <LoadingDotsIcon />;
  }

  return (
    <Page title="Totens">
      {totens.length > 0 && (
        <>
          <div className="row">
            {totens.map(totem => {
              return (
                <div className="col" key={totem._id}>
                  <h3 className="text-center">{totem.name}</h3>
                  <ul className="list-group">
                    {revisors.map(revisor => {
                      let hastotem = totem._id == revisor.totemId ? "checked" : "";
                      return (
                        <li className="list-group-item" key={revisor.id}>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" defaultChecked={hastotem} id={`defaultCheck${revisor.id}`} />
                            <label className="form-check-label" htmlFor={`defaultCheck${revisor.id}`}>
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
