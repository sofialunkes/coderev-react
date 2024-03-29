import React, { useEffect } from "react";

function FlashMessages(props) {
  let cssBehavior = "success";
  let behavior = props.behavior;
  if (props.behavior == "error") {
    cssBehavior = "danger";
  }
  if (props.behavior == "info") {
    cssBehavior = "info";
  }
  if (props.behavior == "default") {
    cssBehavior = "info";
  }

  function createMarkup(msg) {
    if (cssBehavior == "info" && !behavior == "default") {
      return { __html: `${msg} &#9996` };
    }
    if (cssBehavior == "info") {
      return { __html: `${msg}` };
    }
    if (cssBehavior == "danger") {
      return { __html: `${msg} &#129488` };
    }

    return { __html: `${msg} &#128640` };
  }
  return (
    <div className="floating-alerts">
      {props.messages.map((msg, index) => {
        return (
          <div key={index} className={`alert alert-${cssBehavior} text-center floating-alert shadow-sm`}>
            <div dangerouslySetInnerHTML={createMarkup(msg)} />
          </div>
        );
      })}
    </div>
  );
}

export default FlashMessages;
