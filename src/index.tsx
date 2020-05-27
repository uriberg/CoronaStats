import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Continent from "./containers/continent";
import Country from "./containers/country";
import Header from "./layout/header";
import "./sass/main.scss";

const routing = (
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/" component={Continent}/>
                <Route path="/continent/:continent" component={Continent}/>
                <Route path="/country/:country" component={Country}/>
            </Switch>
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
//serviceWorker.unregister();
serviceWorker.register();
