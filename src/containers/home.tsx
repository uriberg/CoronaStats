import React, {Component} from 'react';
import CoronaTable from "../components/CoronaTable";
import Graph from "../components/graph";
import MyResponsiveBar from "../components/barChart";
import axios from 'axios';
import dateformat from 'dateformat';
import {lineGraphSettings} from '../constants/barChart';
import Header from "../layout/header";

class Home extends Component {

    state = {
        dailyCases: []
    };

    componentDidMount(): void {
        axios.get("https://api.covid19api.com/total/dayone/country/israel")
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
                this.setState({dailyCases: temp});
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        return (
            <div className="home">
                <div className="home__table">
                    <CoronaTable filter={false}/>
                </div>
                {/*<div className="home__graphs">*/}
                {/*    <Graph data={this.state.dailyCases}/>*/}
                {/*</div>*/}
                <div>
                    <div style={{height: "500px"}} className="barChart cases-graph">
                        <MyResponsiveBar data={this.state.dailyCases} theme={lineGraphSettings.theme}
                                        keys={'Cases'} AxisLeftLegend={'Daily cases'}/>
                    </div>

                    <div style={{height: "500px"}} className="barChart deaths-graph">
                        <MyResponsiveBar data={this.state.dailyCases} theme={lineGraphSettings.theme}
                                         keys={'Deaths'} AxisLeftLegend={'Daily deaths'}/>
                    </div>

                    <div style={{height: "500px"}} className="barChart activeCases-graph">
                        <MyResponsiveBar data={this.state.dailyCases} theme={lineGraphSettings.theme}
                                         keys={'ActiveCases'} AxisLeftLegend={'Currently Infected'}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default Home;
