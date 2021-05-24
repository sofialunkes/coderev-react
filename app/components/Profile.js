import React, { useEffect, useContext } from "react";
import { useImmer, useImmerReducer } from "use-immer";
import { useParams } from "react-router-dom";
import Page from "./Page";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Axios from "axios";

function Profile() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const initialState = {
    submitCount: 0,
    profileData: {
      name: "...",
      email: "...",
      username: useParams().username,
      scope: "...",
      avatar: "https://secure.gravatar.com/avatar/3ea9b4a66b36358f4caa9416c607a74d.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0003-512.png",
      active: false
    },
    isFetching: true,
    isSaving: false,
    sendCount: 0
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.profileData.name = action.value.name;
        draft.profileData.email = action.value.email;
        draft.profileData.scope = action.value.scope;
        draft.profileData.active = action.value.active;
        if (action.value.avatar != null) {
          draft.profileData.avatar = action.value.avatar;
        }
        draft.isFetching = false;
        return;
      case "activeImmediately":
        draft.profileData.active = action.value;
        draft.sendCount++;
        return;
      case "activeRollback":
        draft.profileData.active = !action.value;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchUser() {
      try {
        const response = await Axios.get(`/users/${appState.user.username}`, { headers: { Authorization: appState.user.token } }, { cancelToken: ourRequest.token });
        if (response.data) {
          dispatch({ type: "fetchComplete", value: response.data });
        } else {
          appDispatch({ type: "flashMessage", behavior: "error", value: "Alguma coisa aconteceu aqui." });
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

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const options = {
      headers: { Authorization: appState.user.token },
      cancelToken: ourRequest.token
    };
    if (state.sendCount > 0) {
      async function updateStatus() {
        try {
          const response = await Axios.post(`/users/${appState.user.username}/status`, state.profileData, options);
        } catch (e) {
          if (e.response.data.type == "user_with_totem") {
            appDispatch({ type: "flashMessage", behavior: "default", value: "Você possui um totem, repasse antes de sair da lista." });
          }
          dispatch({ type: "activeRollback", value: state.profileData.active });
        }
      }

      updateStatus();
    }

    return () => {
      ourRequest.cancel();
    };
  }, [state.sendCount]);

  if (state.isFetching)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );

  return (
    <Page title="Perfil">
      <div className="row">
        <div className="col-4">
          <img className="avatar-regular" src={state.profileData.avatar} /> Configurações
        </div>

        <div className="card col-6">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Endereço e-mail cadastrado:</label>
                <input className="form-control" id="exampleInputEmail1" value={state.profileData.email} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="inputUsername">Username:</label>
                <input className="form-control" id="inputUsername" value={state.profileData.username} readOnly />
                <small>Em construção.</small>
              </div>
              <div className=" form-check">
                <input className="form-check-input" type="checkbox" onChange={e => dispatch({ type: "activeImmediately", value: e.target.checked })} id="isInReviewList" checked={state.profileData.active} />
                <label className="form-check-label" htmlFor="isInReviewList">
                  Participar da revisão
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Profile;
