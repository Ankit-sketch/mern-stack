import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import signUp from './screens/signUp'

import logIn from './screens/logIn'

const App = () => {
  return (
    <div className="App">
    
     <Router>
     <Navbar />
                <Switch>
                <Route exact path = "/signup" component = {signUp}></Route>
                <Route exact path = "/login" component = {logIn}></Route>
                </Switch>
            </Router>
    </div>
  );
}

export default App;
