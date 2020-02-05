import React from "react";

function HomeCards(props) {
  return (
    <div className="row">
      <div className="col-6">
        <br />
        <br />
        <h1>{props.header}</h1>
      </div>
      <div className="col-4">
        <br />
        <br />
        <img src={props.soapURL} alt="barsoaps" height="300" width="400" />
        <br />
      </div>
    </div>
  );
}

export default HomeCards;
