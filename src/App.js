import { Switch, Route, useHistory } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import JiraDashboard from "./pages/JiraDashboard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_HISTORY } from "./redux/constants/JiraNewConstants";
import LoadingComponent from "./GlobalSetting/LoadingComponent/LoadingComponent";
import { JiraNewTemplate } from "./templates/Dashboard Template/JiraNewTemplate";
import CreateProject from "./pages/CreateProject/CreateProject";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import Register from "./pages/Register";

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
      <LoadingComponent />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <UserLoginTemplate exact path="/login" Component={Login} />
        <UserLoginTemplate exact path="/register" Component={Register} />
        <JiraNewTemplate exact path="/dashboard" Component={JiraDashboard} />
        <JiraNewTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
      </Switch>
    </>
  );
}

export default App;
