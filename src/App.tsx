import React from 'react';
import './sass/main.scss';
import Continent from "./containers/continent";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./layout/header";
import Country from "./containers/country";

function App() {
  return (
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/" component={Continent}/>
                <Route path="/continent/:continent" component={Continent}/>
                <Route path="/country/:country" component={Country}/>
            </Switch>
        </Router>
  );
}

export default App;


