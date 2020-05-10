import React, {Component} from 'react';
import {RouteComponentProps} from 'react-router-dom';
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
        dailyCases: [],
        firstCase: "",
        totalCases: "",
        totalDeaths: "",
        totalRecovered: "",
        currentlyInfected: "",
        deathsPerOneMillion: "",
        testsPerOneMillion: ""
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
                    Cases: data[0].Confirmed,
                    Deaths: data[0].Deaths,
                    ActiveCases: data[0].Active
                };
                temp.push(firstDayObject);
                for (let i = 1; i < data.length; i++) {
                    let daily = {
                        x: i,
                        y: data[i].Confirmed - data[i - 1].Confirmed,
                        Date: dateformat(data[i].Date, "mmm dS"),
                        Cases: data[i].Confirmed - data[i - 1].Confirmed,
                        Deaths: data[i].Deaths - data[i - 1].Deaths,
                        ActiveCases: data[i].Active
                    };
                    temp.push(daily);
                }
                console.log(temp);
                this.setState({dailyCases: temp, firstCase: firstDayObject.Date});
            })
            .catch(err => {
                console.log(err)
            });
        axios.get("https://disease.sh/v2/countries/" + this.props.match.params.country + "?yesterday=false")
            .then(response => {
                this.setState({
                    totalCases: response.data.cases,
                    totalDeaths: response.data.deaths,
                    totalRecovered: response.data.recovered,
                    currentlyInfected: response.data.active,
                    deathsPerOneMillion: response.data.deathsPerOneMillion,
                    testsPerOneMillion: response.data.testsPerOneMillion
                });
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        return (
            <div className="country">
                <div className="country__cards">
                    <div className="card card--general">
                        <h3 className="card__title">General</h3>
                        <ul className="card__list">
                            <li className="card__item">First Case: <span>{this.state.firstCase}</span></li>
                            <li className="card__item">Total Cases: <span>{this.state.totalCases}</span></li>
                            <li className="card__item">Total Deaths: <span>{this.state.totalDeaths}</span></li>
                            <li className="card__item">Total Recovered: <span>{this.state.totalRecovered}</span>
                            </li>
                            <li className="card__item">Currently
                                Infected: <span>{this.state.currentlyInfected}</span></li>
                            <li className="card__item">Deaths Per 1
                                Million: <span>{this.state.deathsPerOneMillion}</span></li>
                            <li className="card__item">Tests Per 1
                                Million: <span>{this.state.testsPerOneMillion}</span></li>
                        </ul>
                    </div>
                    <div className="card card--new-cases">
                        <h3 className="card__title">New Cases</h3>
                        <ul className="card__list">
                            <li className="card__item">Worse Day: <span>{this.state.firstCase}</span></li>
                            <li className="card__item">Today: <span>{this.state.totalCases}</span></li>
                            <li className="card__item">Last 7 days: <span>{this.state.totalDeaths}</span></li>
                            <li className="card__item">Last 7 days Average: <span>{this.state.totalRecovered}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="card card--active-cases">
                        <h3 className="card__title">Active Cases</h3>
                        <ul className="card__list">
                            <li className="card__item">Worse Day: <span>{this.state.firstCase}</span></li>
                            <li className="card__item">Today: <span>{this.state.totalCases}</span></li>
                            <li className="card__item">Change: <span>{this.state.totalDeaths}</span></li>
                            <li className="card__item">Critical Condition: <span>{this.state.totalRecovered}</span></li>
                        </ul>
                    </div>
                    <div className="card card--deaths">
                        <h3 className="card__title">Deaths</h3>
                        <ul className="card__list">
                            <li className="card__item">Worse Day: <span>{this.state.firstCase}</span></li>
                            <li className="card__item">Today: <span>{this.state.totalCases}</span></li>
                            <li className="card__item">Last 7 days: <span>{this.state.totalDeaths}</span></li>
                            <li className="card__item">Last 7 days average: <span>{this.state.totalRecovered}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="graphs">

                    <div style={{height: "500px"}} className="barChart country__graph">
                        <MyResponsiveBar data={this.state.dailyCases} theme={lineGraphSettings.theme}
                                         keys={'Cases'} AxisLeftLegend={'Daily cases'}/>
                    </div>

                    <div style={{height: "500px"}} className="barChart country__graph">
                        <MyResponsiveBar data={this.state.dailyCases} theme={lineGraphSettings.theme}
                                         keys={'Deaths'} AxisLeftLegend={'Daily deaths'}/>
                    </div>

                    <div style={{height: "500px"}} className="barChart country__graph">
                        <MyResponsiveBar data={this.state.dailyCases} theme={lineGraphSettings.theme}
                                         keys={'ActiveCases'} AxisLeftLegend={'Currently Infected'}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default Country;



