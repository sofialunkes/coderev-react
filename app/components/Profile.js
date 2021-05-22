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
      nickname: useParams().username,
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
        const response = await Axios.get(`/users/${appState.user.nickname}`, { headers: { Authorization: appState.user.token } }, { cancelToken: ourRequest.token });
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
          const response = await Axios.post(`/users/${appState.user.nickname}/status`, state.profileData, options);
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
            <div className="form-check form-switch">
              <input onChange={e => dispatch({ type: "activeImmediately", value: e.target.checked })} className="form-check-input" type="checkbox" id="isInReviewList" checked={state.profileData.active} />
              <label className="form-check-label" htmlFor="isInReviewList">
                Participar da revisão
              </label>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Profile;
