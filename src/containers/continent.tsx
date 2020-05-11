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

    componentDidMount(): void {
        console.log(this.props.match.params);
    }

    componentDidUpdate(prevProps: Readonly<ContinentProps>, prevState: Readonly<{}>, snapshot?: any): void {
        //console.log('updated');
        //console.log(this.state.continent);
        //console.log(this.props.match);
        // if (prevProps.match.params.continent !== this.props.match.params.continent){
        //     console.log(this.props.match.params.continent);
        //     this.setState({continent: this.props.match.params.continent});
        // }
    }

    render() {
        const continent = this.props.match.params.continent;

        return (
            <div className="continent">
                <CoronaTable filter={true} continent={Continents[continent]}/>
            </div>
        );
    }
};

export default Continent;



