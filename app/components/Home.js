import React, { useContext, useEffect } from "react";
import Page from "./Page";
import StateContext from "../StateContext";
import { useImmer } from "use-immer";
import LoadingDotsIcon from "./LoadingDotsIcon";

function Home() {
  const appState = useContext(StateContext);
  const [state, setState] = useImmer({
    isLoading: false
  });

  if (state.isLoading) {
    return <LoadingDotsIcon />;
  }

  return (
    <Page title="Your Feed">
      <h2 className="text-center">
        Hello <strong>{appState.user.name}</strong>, your feed is empty.
      </h2>
      <p className="lead text-muted text-center">Your feed displays the latest posts from the people you follow. If you don&rsquo;t have any friends to follow that&rsquo;s okay; you can use the &ldquo;Search&rdquo; feature in the top menu bar to find content written by people with similar interests and then follow them.</p>
    </Page>
  );
}

export default Home;
