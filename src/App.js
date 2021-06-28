import People from "./peoples/people";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

const App = () => {

    return (
      <Router>
        <Switch>
            <Route exact path="/" component={ People }></Route>
        </Switch>
      </Router>
    );
};

export default App;