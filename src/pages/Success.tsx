import React from "react";
import success from "../assets/successful.svg";
import { useHistory } from "react-router";
export default function Success() {
  const his = useHistory();
  return (
    <div className="success">
      <div className="success__image">
        <img src={success} alt="success-svg" />
      </div>
      <h1 className="success__maintext">Payment Successful</h1>
      <h1 className="success__subtext">You can go back to app</h1>
      <button onClick={() => his.push("/")} className="success__goback">
        GO BACK
      </button>
    </div>
  );
}
