import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";
import { Card, Grid, Page, StatsCard, Table, Icon, Text } from "tabler-react";
import Countrywise from './Countrywise';
import WorldMap from './WorldMap';
import HeaderCard from './HeadeCard';
import USMap from './USMap';
import axios from 'axios';
import states from './states.json';
 
export default class Home extends React.Component {

  state = {
		data: []
	};

	componentDidMount() {
		this.getCountriesData();
	}

  async getCountriesData() {
    var dataset = [];
		await axios.get('https://covidtracking.com/api/states')
			.then(response => {
			this.objData = response;
			this.objData = this.objData.data;
    const maxValue = this.objData.sort((a,b) => b.positive - a.positive).slice(0,5);
    this.setState({ maxData: maxValue });
    maxValue.map((item, index) => {
      states.map((state) => {
        if(Object.keys(state)[0] === item.state){
            return dataset[index] = {stateName: Object.values(state)[0], cases: item.positive }
        }  
      })
    })
    this.setState({data: dataset})
    console.log(this.state.data[0].stateName)
		})
		.catch(error => {
		console.log(error);
		});
  }

  createTable = () => {
    let table = []
    this.state.data.map((value) => {
      table.push(<Table.Row>
        <Table.Col>
          <Icon prefix="fa" name="chrome" className="text-muted" />
        </Table.Col>
        <Table.Col>{value.stateName}</Table.Col>
        <Table.Col className="text-right">
          <Text RootComponent="span" muted>
            {value.cases}
          </Text>
        </Table.Col>
      </Table.Row>);
    })
  
    return table
  }

  render() {
    return (
      <Page.Content title="Covid19 Dashboard">
        <HeaderCard />
      <Card>
        <Card.Header>
          <Card.Title>World Reporting Cases of COVID-19</Card.Title>
        </Card.Header>
        <Grid.Row cards={true}>
        <Grid.Col lg={4}>
                <Card>
                  <Countrywise></Countrywise>
                </Card>
              </Grid.Col>
              <Grid.Col lg={7}>
                <WorldMap />
              </Grid.Col>
      </Grid.Row>
      <Grid.Row cards={true}></Grid.Row>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title>States Reporting Cases of COVID-19</Card.Title>
        </Card.Header>
        <Grid.Row>
          <Grid.Col lg={7}>
            <USMap />
          </Grid.Col>
          <Grid.Col lg={4}>
          <Card title="Top 5 Corona Affectecd States">
                  <Table className="card-table">
                  {this.createTable()}
                  </Table>
                </Card>
          </Grid.Col>
        </Grid.Row>
      </Card>
      </Page.Content>
    );
  }
}