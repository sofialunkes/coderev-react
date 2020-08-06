import React, { useContext, useEffect, useState } from "react";
import Page from "./Page";
import StateContext from "../StateContext";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Axios from "axios";
import ReviewList from "./ReviewList";

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
                      return <ReviewList key={revisor.id} revisor={revisor} totem={totem} />;
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
