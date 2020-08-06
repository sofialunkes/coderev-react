import React, { useEffect, useState } from "react";

function ReviewList(props) {
  const revisor = props.revisor;
  const totem = props.totem;

  const [newRevisor, setNewRevisor] = useState();

  let hastotem = totem._id == revisor.totemId ? "checked" : "";

  useEffect(() => {
    try {
      console.log(newRevisor);
    } catch (e) {
      console.log(e);
    }
  }, [newRevisor]);

  function changeRevisor(e) {
    setNewRevisor(e);
  }

  return (
    <li className="list-group-item">
      <div className="form-check">
        <input onClick={() => changeRevisor(revisor)} className="form-check-input" type="checkbox" value="" id={`defaultCheck${revisor.id}`} defaultChecked={revisor.totemId == totem._id} />
        <label className="form-check-label" htmlFor={`defaultCheck${revisor.id}`}>
          {revisor.name}
        </label>
      </div>
    </li>
  );
}

export default ReviewList;
