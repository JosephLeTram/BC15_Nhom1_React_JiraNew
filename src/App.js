import { BrowserRouter } from "react-router-dom";

import "./App.css";

import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";

function App() {
  return (
    <BrowserRouter>
      <UserLoginTemplate path="" Component={UserLoginTemplate} />
    </BrowserRouter>
  );
}

export default App;
