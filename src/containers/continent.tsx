import React, {Component} from 'react';
import CoronaTable from "../components/CoronaTable";
import { RouteComponentProps} from 'react-router-dom';
import {Continents} from "../constants/corona-table";

interface ContinentRouterProps {
    continent: string
}

interface ContinentProps extends RouteComponentProps<ContinentRouterProps> {
    // Add your regular properties here
}

class Continent extends Component<ContinentProps> {

    state = {
        continent: this.props.match.params.continent
    };

    render() {
        const continent = this.props.match.params.continent;

        return (
                <CoronaTable filter={true} continent={Continents[continent]}/>
        );
    }
}

export default Continent;



