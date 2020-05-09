import React, {Component} from 'react';
import { RouteComponentProps} from 'react-router-dom';
import axios from "axios";
import dateformat from "dateformat";
import MyResponsiveBar from "../components/barChart";
import {lineGraphSettings} from "../constants/barChart";

interface CountryRouterProps {
    country: string
}

interface CountryProps extends RouteComponentProps<CountryRouterProps> {
    // Add your regular properties here
}

class Country extends Component<CountryProps> {

    state = {
        dailyCases: []
    };

    componentDidMount(): void {
        console.log(this.props.match.params.country);
        axios.get("https://api.covid19api.com/total/dayone/country/" + this.props.match.params.country)
            .then(response => {
                console.log(response.data);
                let data = response.data;
                let temp = [];
                let firstDate = dateformat(data[0].Date, "mmm dS");
                console.log(firstDate);
                const firstDayObject = {
                    x: 0,
                    y: data[0].Confirmed,
                    Date: firstDate,
                    Deaths: data[0].Confirmed
                };
                temp.push(firstDayObject);
                for (let i = 1; i < data.length; i++) {
                    let daily = {
                        x: i,
                        y: data[i].Confirmed - data[i - 1].Confirmed,
                        Date: dateformat(data[i].Date, "mmm dS"),
                        Deaths: data[i].Confirmed - data[i - 1].Confirmed
                    };
                    temp.push(daily);
                }
                console.log(temp);
                this.setState({dailyCases: temp});
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        return (
            <div className="country">
                <div style={{height: "500px"}} className="barChart">
                    <MyResponsiveBar data={this.state.dailyCases} theme={lineGraphSettings.theme}/>
                </div>
            </div>
        );
    }
};

export default Country;



