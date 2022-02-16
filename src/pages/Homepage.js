import React from "react";
import { useSelector } from "react-redux";

export default function Homepage() {
  // Connect to store and change state
  let history = useSelector((state) => state.HistoryReducer.history);

  //Chage web link directory
  const goToSignIn = () => {
    alert("Đang chuyển về Login Page !");
    history.push("/login");
  };
  return (
    <div className="container">
      <h3>This is Home Page</h3>
      <button className="btn btn-success" onClick={goToSignIn}>
        Sign-In
      </button>
    </div>
  );
}
