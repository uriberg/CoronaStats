import React from 'react';
import ReactDOM from 'react-dom';
//import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Graph from "./components/graph";
import MyResponsiveBar from "./components/barChart";
import CoronaTable from "./components/CoronaTable";
import Continent from "./containers/continent";

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/continent/:continent" component={Continent} />
                <Route path="/country/:country" component={MyResponsiveBar} />
                <Route component={CoronaTable} />
            </Switch>
        </div>
    </Router>
);



ReactDOM.render(
  <React.StrictMode>
      {routing}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
