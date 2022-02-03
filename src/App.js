import "./App.css";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_HISTORY } from "./redux/constants/CyberJiraNew";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ADD_HISTORY,
      history: history,
    });
  }, []);
  return (
    <>
      <Switch>
        <div className="App">
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </Switch>
    </>
  );
}

export default App;
