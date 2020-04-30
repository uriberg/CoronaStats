import React, {Component} from 'react';
import CoronaTable from "../components/CoronaTable";
import Graph from "../components/graph";
import BarChart from "../components/barChart";
import MyResponsiveBar from "../components/barChart";
import axios from 'axios';

const lineGraphSettings = {
    theme: {
        fontSize: '1.1rem',
    },
};

const data = [
    {
        "country": "AD",
        "hot dog": 174,
        "hot dogColor": "hsl(328, 70%, 50%)",
        "burger": 12,
        "burgerColor": "hsl(261, 70%, 50%)",
        "sandwich": 150,
        "sandwichColor": "hsl(82, 70%, 50%)",
        "kebab": 24,
        "kebabColor": "hsl(342, 70%, 50%)",
        "fries": 96,
        "friesColor": "hsl(164, 70%, 50%)",
        "donut": 197,
        "donutColor": "hsl(284, 70%, 50%)"
    },
    {
        "country": "AE",
        "hot dog": 164,
        "hot dogColor": "hsl(205, 70%, 50%)",
        "burger": 170,
        "burgerColor": "hsl(67, 70%, 50%)",
        "sandwich": 105,
        "sandwichColor": "hsl(194, 70%, 50%)",
        "kebab": 90,
        "kebabColor": "hsl(132, 70%, 50%)",
        "fries": 3,
        "friesColor": "hsl(286, 70%, 50%)",
        "donut": 192,
        "donutColor": "hsl(324, 70%, 50%)"
    },
    {
        "country": "AF",
        "hot dog": 124,
        "hot dogColor": "hsl(320, 70%, 50%)",
        "burger": 68,
        "burgerColor": "hsl(237, 70%, 50%)",
        "sandwich": 117,
        "sandwichColor": "hsl(32, 70%, 50%)",
        "kebab": 115,
        "kebabColor": "hsl(186, 70%, 50%)",
        "fries": 30,
        "friesColor": "hsl(174, 70%, 50%)",
        "donut": 56,
        "donutColor": "hsl(207, 70%, 50%)"
    },
    {
        "country": "AG",
        "hot dog": 81,
        "hot dogColor": "hsl(291, 70%, 50%)",
        "burger": 190,
        "burgerColor": "hsl(345, 70%, 50%)",
        "sandwich": 29,
        "sandwichColor": "hsl(65, 70%, 50%)",
        "kebab": 85,
        "kebabColor": "hsl(245, 70%, 50%)",
        "fries": 169,
        "friesColor": "hsl(141, 70%, 50%)",
        "donut": 15,
        "donutColor": "hsl(34, 70%, 50%)"
    },
    {
        "country": "AI",
        "hot dog": 104,
        "hot dogColor": "hsl(132, 70%, 50%)",
        "burger": 95,
        "burgerColor": "hsl(246, 70%, 50%)",
        "sandwich": 177,
        "sandwichColor": "hsl(79, 70%, 50%)",
        "kebab": 132,
        "kebabColor": "hsl(184, 70%, 50%)",
        "fries": 139,
        "friesColor": "hsl(298, 70%, 50%)",
        "donut": 103,
        "donutColor": "hsl(326, 70%, 50%)"
    },
    {
        "country": "AL",
        "hot dog": 178,
        "hot dogColor": "hsl(7, 70%, 50%)",
        "burger": 106,
        "burgerColor": "hsl(48, 70%, 50%)",
        "sandwich": 68,
        "sandwichColor": "hsl(239, 70%, 50%)",
        "kebab": 101,
        "kebabColor": "hsl(145, 70%, 50%)",
        "fries": 26,
        "friesColor": "hsl(55, 70%, 50%)",
        "donut": 62,
        "donutColor": "hsl(107, 70%, 50%)"
    },
    {
        "country": "AM",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "1",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 100,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "2",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 91,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "3",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 24,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "4",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 117,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "5",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 78,
        "donutColor": "hsl(285, 70%, 50%)"
    }, {
        "country": "6",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 89,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "7",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 56,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "8",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "9",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "10",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "11",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "12",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "13",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "14",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "15",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "16",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "17",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "18",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "19",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "20",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "21",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "22",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "23",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "24",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "25",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "26",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "27",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "28",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "29",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "30",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "31",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },
    {
        "country": "32",
        "hot dog": 196,
        "hot dogColor": "hsl(237, 70%, 50%)",
        "burger": 58,
        "burgerColor": "hsl(169, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(245, 70%, 50%)",
        "kebab": 52,
        "kebabColor": "hsl(49, 70%, 50%)",
        "fries": 51,
        "friesColor": "hsl(125, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(285, 70%, 50%)"
    },


];



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
                const firstDayObject = {
                    x: 0,
                    y: data[0].Confirmed,
                    Date: data[0].Date
                };
                temp.push(firstDayObject);
                for (let i = 1; i < data.length; i++) {
                    let daily = {
                        x: i,
                        y: data[i].Confirmed - data[i-1].Confirmed,
                        Date: data[i].Date
                    }
                    temp.push(daily);
                }
                console.log(temp);
                this.setState({dailyCases: temp});
            })
            .catch(err => {console.log(err)});
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
                <div style={{height: "500px"}}>
                    <MyResponsiveBar data={data} theme={lineGraphSettings.theme}/>
                </div>
            </div>
        );
    }
};

export default Home;