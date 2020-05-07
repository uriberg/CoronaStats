import _ from 'lodash';
import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import axios from 'axios';


interface countryRow {
    country: string,
    cases: number
}

interface AllProps {
    filter: boolean
    continent?: string
}

let tableData: countryRow [] = [];

class CoronaTable extends Component<AllProps> {
    state = {
        column: null,
        data: [],
        direction: null,
        yesterday: []
    };

    componentDidMount(): void {
        axios.get("https://disease.sh/v2/countries?yesterday=false")
            .then(response => {
                console.log(response.data);
                //let temp = this.state.data;
                let temp = response.data;
                let result = [];
                for (let i = 0; i < temp.length; i++) {
                    console.log(this.props.filter);
                    if(!this.props.filter || (this.props.filter && (this.props.continent.localeCompare(temp[i].continent) === 0))){
                        temp[i].activeChange = "";
                        result.push(temp[i]);
                    }
                }
                console.log(result);
                //temp.push(response.data);
                this.setState({data: result});
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
                console.log(response.data);
                console.log('before for loop');
                console.log(this.state.data);
                let today = this.state.data;
                let yesterday = [];
                let j = 0;

                for(let i = 0; i <response.data.length; i++){
                    if(!this.props.filter || (this.props.filter && (this.props.continent!.localeCompare(response.data[i].continent!) === 0))){
                        yesterday.push(response.data[i]);
                    }
                }


                for (let i = 0; i < today.length; i++, j++) {
                    if (today[i].country !== yesterday[i].country) {
                        today.splice(i, 1);
                    }
                }

                for (let i = 0; i < today.length; i++) {
                    if (today[i].active === 0 && yesterday[i].active === 0) {
                        today[i].activeChange = 0;
                    } else {
                        console.log(today[i].active);
                        console.log(yesterday[i].active);
                        today[i].activeChange = +(today[i].active / yesterday[i].active * 100 - 100).toFixed(2);
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
            <div className="table-wrapper">
                <div className="scroller">
                    <table className="ui single line celled unstackable bottom attached table sortable Flip"
                           style={{display: "table", fontSize: "1.2rem"}}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    sorted={column === 'country' ? direction : null}
                                    onClick={this.handleSort('country')}
                                    className="table-header__cell"
                                >
                                    Name
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'cases' ? direction : null}
                                    onClick={this.handleSort('cases')}
                                    className="table-header__cell"
                                >
                                    Total <br/>Cases
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'todayCases' ? direction : null}
                                    onClick={this.handleSort('todayCases')}
                                    className="table-header__cell"
                                >
                                    New <br/>Cases
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'deaths' ? direction : null}
                                    onClick={this.handleSort('deaths')}
                                    className="table-header__cell"
                                >
                                    Total <br/>Deaths
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'active' ? direction : null}
                                    onClick={this.handleSort('active')}
                                    className="table-header__cell"
                                >
                                    Active<br/>Cases
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'activeChange' ? direction : null}
                                    onClick={this.handleSort('activeChange')}
                                    className="table-header__cell"
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
            </div>
        )
    }
};

export default CoronaTable;
