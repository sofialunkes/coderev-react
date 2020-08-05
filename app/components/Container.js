import React, { useEffect } from "react";

function Container(props) {
  return <div className={"container py-md-3 " + (props.wide ? "" : "container")}>{props.children}</div>;
}

export default Container;
