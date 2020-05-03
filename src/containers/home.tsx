import React, {Component} from 'react';
import CoronaTable from "../components/CoronaTable";
import Graph from "../components/graph";
import BarChart from "../components/barChart";
import MyResponsiveBar from "../components/barChart";
import axios from 'axios';
import dateformat from 'dateformat';

const lineGraphSettings = {
    theme: {
        fontSize: '1.1rem',
        "tooltip": {
            "container": {
                "position": "absolute",
                "left": "50%",
                "transform": "translateX(-50%)",
                "margin-top": 25,
                "font-size": "1.5rem"
            }
        }
    },
    tooltip: {
        fontSize: 2
    }
};

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
            <div className="home">
                <div className="home__table">
                    <CoronaTable/>
                </div>

                <div className="home__graphs">
                    <Graph data={this.state.dailyCases}/>
                </div>
                <div>
                    <div style={{height: "500px"}} className="barChart">
                        <MyResponsiveBar data={this.state.dailyCases} theme={lineGraphSettings.theme}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default Home;