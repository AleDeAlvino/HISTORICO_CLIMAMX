import React from "react";

export default function input(props) {
  return (
    <div className="row">
      <div className="input-field cols12">
        <input
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.action}
          value={props.value}
        ></input>
      </div>
    </div>
  );
}
