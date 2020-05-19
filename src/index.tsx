import React from 'react';
import ReactDOM from 'react-dom';
//import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import CoronaTable from "./components/CoronaTable";
import Continent from "./containers/continent";
import Country from "./containers/country";
import Header from "./layout/header";
import "./index.scss";
import "./sass/main.scss";

const routing = (
    <Router>
        <div className="websiteWrapper">
            <Header/>
            <div className="containersWrapper">
                <Switch>
                    <Route exact path="/" component={Continent}/>
                    <Route path="/continent/:continent" component={Continent}/>
                    <Route path="/country/:country" component={props => (<Country {...props} />)}/>
                    <Route component={CoronaTable}/>
                </Switch>
            </div>
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
