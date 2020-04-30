/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const lineGraphSettings = {
    theme: {
        fontSize: '14px',
        textColor: 'blue',
    },
};

interface graphProps {
    data: any []
}

class Graph extends Component<graphProps> {

    componentDidUpdate(): void {
        console.log(this.props.data);
    }


    changeTitleSize = (e) => {
        console.log(e);
        console.log(window.innerWidth);
        if (window.innerWidth < 480) {
            return 10;
        } else {
            return e.value;
        }
    };

    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark1", // "light1", "dark1", "dark2"
            title:{
                text: "Daily new cases"
            },
            axisY: {
                title: "daily cases",
                includeZero: false,
            },
            axisX: {
                prefix: "W",
                interval: 5
            },
            data: [{
                type: "line",
                toolTipContent: "{Date}, Amount: {y}",
                dataPoints: this.props.data
            }]
        };
        return (
            <div>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
};
export default Graph;