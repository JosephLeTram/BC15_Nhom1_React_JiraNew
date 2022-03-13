import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Homepage() {
  // Connect to store and change state
  let history = useSelector((state) => state.HistoryReducer.history);

  //Chage web link directory
  const goToSignIn = () => {
    // alert("Đang chuyển về Login Page !");
    history.push("/login");
  };
  const goToRegister = () => {
    // alert("Đang chuyển về Login Page !");
    history.push("/register");
  };
  return (
    <div className="text-center" style={{ paddingTop: "8%" }}>
      <h3>Welcome to Jira Clone - CyberSoft</h3>
      <img src={require("../assets/img/jira-la-gi.jpg")} alt="loading gif" />
      <div style={{ width: "50%", margin: "0 auto" }}>
        <button className="btn btn-primary my-3" onClick={goToRegister}>
          <span>Don't have account yet ?</span>
        </button>
        <button className="btn btn-success my-3 ml-3" onClick={goToSignIn}>
          Returning User ?
        </button>
      </div>
      <br />
    </div>
  );
}
