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

    componentDidMount(): void {
        console.log(this.props.match.params);
    }

    render() {
        const continent = this.props.match.params.continent;

        return (
            <div className="continent">
                <div> </div>
                <CoronaTable filter={true} continent={Continents[continent]}/>
            </div>
        );
    }
};

export default Continent;



