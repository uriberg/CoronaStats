import sortBy from 'lodash.sortby';
import map from 'lodash/map';
import React, {Component} from 'react';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import axios from 'axios';
import Spinner from '../components/UI/Spinner';
import {FixedSizeList as List} from 'react-window';
import {Virtuoso} from 'react-virtuoso';
import LazyLoad from 'react-lazyload';

interface AllProps {
    filter: boolean
    continent?: string
}

const item = (data, index) => {
    return (
        <Table.Row key={data[index].country}>
            <Table.Cell><a href={`/country/` + data[index].country}>{data[index].country}</a></Table.Cell>
            <Table.Cell>{data[index].cases}</Table.Cell>
            <Table.Cell>{data[index].todayCases}</Table.Cell>
            <Table.Cell>{data[index].deaths}</Table.Cell>
            <Table.Cell>{data[index].active}</Table.Cell>
            <Table.Cell>{data[index].activeChange + "%"}</Table.Cell>
        </Table.Row>
    );
};

class CoronaTable extends Component<AllProps> {
    state = {
        column: null,
        data: [],
        direction: null,
        continent: this.props.continent,
        loading: true
    };

    componentDidMount(): void {
        console.log(this.state.continent);
        console.log(this.props.filter);
        this.init();
    }


    componentDidUpdate(prevProps: Readonly<AllProps>, prevState: any, snapshot?: any): void {
        console.log('table has been updated!');
        if (prevProps.continent !== this.props.continent) {
            this.setState({continent: this.props.continent, loading: true});
            this.init();
        }
    }


    init = () => {
        axios.get("https://disease.sh/v2/countries?yesterday=false")
            .then(response => {
                let temp = response.data;
                let result = [];
                for (let i = 0; i < temp.length; i++) {
                    console.log(this.props.filter);
                    if (this.props.continent === undefined || !this.props.filter || (this.props.filter && (this.props.continent.localeCompare(temp[i].continent) === 0))) {
                        temp[i].activeChange = "";
                        result.push(temp[i]);
                    }
                }
                this.getYesterdayStats(result);
            })
            .catch(err => {
                console.log(err)
            });
    };

    getYesterdayStats = async (data: any) => {
        await axios.get("https://corona.lmao.ninja/v2/countries?yesterday=true")
            .then(response => {
                let today = data;
                let yesterday = [];

                for (let i = 0; i < response.data.length; i++) {
                    if (this.state.continent === undefined || !this.props.filter || (this.props.filter && (this.props.continent!.localeCompare(response.data[i].continent!) === 0))) {
                        yesterday.push(response.data[i]);
                    }
                }

                for (let i = 0; i < today.length; i++) {
                    if (today[i].country !== yesterday[i].country) {
                        today.splice(i, 1);
                    }
                }

                for (let i = 0; i < today.length; i++) {
                    if (today[i].active === 0 && yesterday[i].active === 0) {
                        today[i].activeChange = 0;
                    } else {
                        today[i].activeChange = +(today[i].active / yesterday[i].active * 100 - 100).toFixed(2);
                    }

                }
                //this.setState({data: today});
                this.setSort(today, this.state.direction, this.state.column);
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
                data: sortBy(data, [clickedColumn]),
                direction: 'ascending',
            });

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    };

    setSort = (data, direction, clickedColumn) => {
        if (clickedColumn) {
            let temp = sortBy(data, [clickedColumn]);
            if (direction === 'descending') {
                temp.reverse();
            }

            // this.setState({
            //              data: temp,
            //              direction: direction === 'ascending' ? 'ascending' : 'descending',
            //              loading: false
            //          });
            window.setTimeout(() => {
                this.setState({
                    data: temp,
                    direction: direction === 'ascending' ? 'ascending' : 'descending',
                    loading: false
                });
            }, 400);
        } else {
            console.log('set sort - the timoeut');
            // this.setState({
            //     data: data,
            //     loading: false
            // });
            window.setTimeout(() => {
                this.setState({
                    data: data,
                    loading: false
                });
            }, 400);
        }
    };

    render() {
        const {column, data, direction} = this.state;

        return (
            <>
                <div className={['spin', this.state.loading ? 'fadeIn' : 'fadeOut'].join(' ')}>
                    <Spinner/>
                </div>
                <div className={["table-wrapper", !this.state.loading ? 'fadeIn' : 'fadeOut'].join(' ')}>
                    <table className="ui single line celled unstackable bottom attached table sortable Flip">
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
                                {map(data, ({country, cases, todayCases, deaths, active, activeChange}) => (
                                        <Table.Row key={country}>
                                            <Table.Cell><a href={`/country/` + country}>{country}</a></Table.Cell>
                                            <Table.Cell>{cases}</Table.Cell>
                                            <Table.Cell>{todayCases}</Table.Cell>
                                            <Table.Cell>{deaths}</Table.Cell>
                                            <Table.Cell>{active}</Table.Cell>
                                            <Table.Cell>{activeChange + "%"}</Table.Cell>
                                        </Table.Row>
                                ))}


                                {/*<Virtuoso*/}
                                {/*    style={{ width: 'auto', height: '100vh' }}*/}
                                {/*    totalCount={200}*/}
                                {/*    item={index => <Table.Row key={data[index]?.country}>*/}
                                {/*        <Table.Cell><a href={`/country/` + data[index]?.country}>{data[index]?.country}</a></Table.Cell>*/}
                                {/*        <Table.Cell>{data[index]?.cases}</Table.Cell>*/}
                                {/*        <Table.Cell>{data[index]?.todayCases}</Table.Cell>*/}
                                {/*        <Table.Cell>{data[index]?.deaths}</Table.Cell>*/}
                                {/*        <Table.Cell>{data[index]?.active}</Table.Cell>*/}
                                {/*        <Table.Cell>{data[index]?.activeChange + "%"}</Table.Cell>*/}
                                {/*    </Table.Row>}*/}
                                {/*/>*/}
                            </Table.Body>
                    </table>
                </div>
            </>
        );
    }
}

export default CoronaTable;
