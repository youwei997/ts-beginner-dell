import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/Login/index";
import HomePage from "./pages/Home";

const App: React.FC = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/" component={HomePage}></Route>
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
