import _ from 'lodash';
import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import axios from 'axios';

interface countryRow {
    country: string,
    cases: number
}

let tableData: countryRow [] = [];

class CoronaTable extends Component {
    state = {
        column: null,
        data: [],
        direction: null,
        yesterday: []
    };

    componentDidMount(): void {
        axios.get("https://corona.lmao.ninja/v2/countries?yesterday=false")
            .then(response => {
                console.log(response.data);
                //let temp = this.state.data;
                let temp = response.data;
                for (let i = 0; i < temp.length; i++) {
                    temp[i].activeChange = "";
                }
                //temp.push(response.data);
                this.setState({data: temp});
                console.log(this.state.data);
                this.getYesterdayStats();
            })
            .catch(err => {
                console.log(err)
            });
    }

    getYesterdayStats = () => {
        axios.get("https://corona.lmao.ninja/v2/countries?yesterday=true")
            .then(response => {
                console.log('before for loop');
                console.log(this.state.data);
                let today = this.state.data;
                let yesterday = response.data;
                for (let i = 0; i < today.length; i++) {
                    console.log(today[i].activeChange);
                    if (today[i].active === 0 && yesterday[i].active === 0) {
                        console.log(today[i].country);
                        today[i].activeChange = 0;
                    } else {
                        if (today[i].active > yesterday[i].active) {
                            today[i].activeChange = +(today[i].active / yesterday[i].active).toFixed(2);
                        } else {
                            today[i].activeChange = +(today[i].active / yesterday[i].active * 100 - 100).toFixed(2);
                        }
                    }

                    //today[i].activeChange = today[i].active - yesterday[i].active;
                }
                this.setState({data: today});
            })
            .catch(err => {
                console.log(err)
            });
    };

    handleSort = (clickedColumn: any) => () => {
        const {column, data, direction} = this.state;

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            });

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    };

    render() {
        const {column, data, direction} = this.state;

        return (
            <div  style={{overflowX: "scroll", height: '80vh'}}>
                <table className="ui single line celled unstackable bottom attached table sortable"
                       style={{display: "table"}}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === 'country' ? direction : null}
                                onClick={this.handleSort('country')}
                                className="stickP"
                            >
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'cases' ? direction : null}
                                onClick={this.handleSort('cases')}
                            >
                                Total <br/>Cases
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'todayCases' ? direction : null}
                                onClick={this.handleSort('todayCases')}
                            >
                                New <br/>Cases
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'deaths' ? direction : null}
                                onClick={this.handleSort('deaths')}
                            >
                                Total <br/>Deaths
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'active' ? direction : null}
                                onClick={this.handleSort('active')}
                            >
                                Active<br/>Cases
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'activeChange' ? direction : null}
                                onClick={this.handleSort('activeChange')}
                            >
                                Active Cases <br/> Change
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <style>{`
            @media (max-width: 767px){
                    .ui.table:not(.unstackable) tbody{
              display: table-row-group !important;
            }
            .ui.table:not(.unstackable) tr>td{
            display: table-cell !important;
          
             }
             
             .ui.table:not(.unstackable) tr>th {
                display: table-cell !important;
             }
             
             .ui.table:not(.unstackable) tr{
             display: table-row !important;
             }
            }
          `}</style>
                        {_.map(data, ({country, cases, todayCases, deaths, active, activeChange}) => (
                            <Table.Row key={country}>
                                <Table.Cell><a href="#">{country}</a></Table.Cell>
                                <Table.Cell>{cases}</Table.Cell>
                                <Table.Cell>{todayCases}</Table.Cell>
                                <Table.Cell>{deaths}</Table.Cell>
                                <Table.Cell>{active}</Table.Cell>
                                <Table.Cell>{activeChange + "%"}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </table>

            </div>
        )
    }
};

export default CoronaTable;