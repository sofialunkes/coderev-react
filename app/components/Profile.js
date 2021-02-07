import React, { useEffect, useContext } from "react";
import { useImmer, useImmerReducer } from "use-immer";
import { useParams } from "react-router-dom";
import Page from "./Page";
import StateContext from "../StateContext";
import Axios from "axios";

function Profile() {
  const appState = useContext(StateContext);

  const initialState = {
    submitCount: 0,
    profileData: {
      name: "...",
      email: "...",
      nickname: "...",
      scope: "...",
      avatar: "https://secure.gravatar.com/avatar/3ea9b4a66b36358f4caa9416c607a74d.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0003-512.png",
      active: false
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        console.log("entrou aqui");
        console.log(action.value);
        draft.profileData.name = action.value.name;
        draft.profileData.email = action.value.email;
        draft.profileData.nickname = action.value.nickname;
        draft.profileData.scope = action.value.scope;
        draft.profileData.active = action.value.active;
        if (action.value.avatar != null) {
          draft.profileData.avatar = action.value.avatar;
        }
      case "activeImmediately":
        draft.profileData.value = action.value;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchUser() {
      try {
        const response = await Axios.get(`/users/${appState.user.nickname}`, { headers: { Authorization: appState.user.token } }, { cancelToken: ourRequest.token });
        if (response.data) {
          dispatch({ type: "fetchComplete", value: response.data });
        }
      } catch (e) {
        console.log(e.response);
      }
    }
    fetchUser();

    return () => {
      ourRequest.cancel();
    };
  }, []);

  function handleActiveRevisor(params) {}
  return (
    <Page title="Perfil">
      <h2>
        <img className="avatar-small" src={state.profileData.avatar} /> Configurações
      </h2>

      <div className="card">
        <div className="card-body">
          <div className="form-check form-switch">
            <input onChange={e => dispatch(e)} className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={state.profileData.active} />
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
              Participar da lista
            </label>
          </div>
          <div className="form-check form-switch">
            <input onChange={e => dispatch(e)} className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={state.profileData.active} />
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
              Participar da lista
            </label>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Profile;
