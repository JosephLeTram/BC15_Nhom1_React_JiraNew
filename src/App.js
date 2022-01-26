import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/login" component={Login} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
