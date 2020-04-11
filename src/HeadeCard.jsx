import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";
import { Grid, StatsCard, Card } from "tabler-react";
import axios from 'axios';
import Moment from 'react-moment';
import moment from 'moment';
 
export default class HeaderCard extends Component {

  state = {
		data: {
    },
	};

  componentDidMount() {
		this.getAllCountryData();
  }
  
  getAllCountryData(){
    axios.get('https://corona.lmao.ninja/all')
			.then(response => {
      this.objData = response.data;
      this.setState({ data: this.objData });
      var startdate = moment();
      this.startdate = startdate.subtract(1, "days");
      console.log(this.startdate.format("DD-MM-YYYY"));
      // this.startdate = this.startdate.format("DD-MM-YYYY");
  })
  .catch(error => {
    console.log(error);
  })
}

  render() {
    return (
      <Grid.Row cards={true}>
      <Grid.Col width={6} sm={4} lg={2}>
          <StatsCard layout={1} movement={6} total={this.state.data.cases} label="Total Cases" className="sd"/>
      </Grid.Col>
      <Grid.Col width={6} sm={4} lg={2}>
          <StatsCard layout={1} movement={6} total={this.state.data.deaths} label="Total Deaths" />
      </Grid.Col>
      <Grid.Col width={6} sm={4} lg={2}>
          <StatsCard layout={1} movement={6} total={this.state.data.recovered} label="Total Recovered" />
      </Grid.Col>
      <Grid.Col width={5} sm={4} lg={2}>
          <StatsCard layout={1} movement={6} total={this.state.data.critical} label="Critical Cases" />
      </Grid.Col>
      <Grid.Col width={8} sm={4} lg={3}>
          <StatsCard layout={1} movement={6} total={this.state.data.tests} label="Total Tests" />
      </Grid.Col>
      <Grid.Col width={5} sm={4} lg={2}>
          <StatsCard layout={1} movement={6} total={this.state.data.testsPerOneMillion} label="Tests per 1Mn" />
      </Grid.Col>
      <Grid.Col width={5} sm={4} lg={2}>
          <StatsCard layout={1} movement={6} total={this.state.data.todayCases} label="Today Cases" />
      </Grid.Col>
      <Grid.Col width={5} sm={4} lg={2}>
          <StatsCard layout={1} movement={6} total={this.state.data.todayDeaths} label="Today Deaths" />
      </Grid.Col>
    </Grid.Row>
    );
  }
}