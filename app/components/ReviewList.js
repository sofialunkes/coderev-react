import React, { useEffect } from "react";

function ReviewList(props) {
  const revisor = props.revisor;
  const totem = props.totem;

  let hastotem = totem._id == revisor.totemId ? "checked" : "";
  return (
    <li className="list-group-item">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" defaultChecked={hastotem} id={`defaultCheck${revisor.id}`} />
        <label className="form-check-label" htmlFor={`defaultCheck${revisor.id}`}>
          {revisor.name}
        </label>
      </div>
    </li>
  );
}

export default ReviewList;
