import "./App.css";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/main.scss";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Payment />
          </Route>
          <Route path="/success" exact>
            <Success />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
