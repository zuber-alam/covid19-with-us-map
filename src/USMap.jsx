/* global d3 */

import React from 'react';

import Datamap from 'react-datamaps';
import axios from 'axios';
import { Grid, Card } from "tabler-react";
import './Style.css';

export default class USMap extends React.Component {

	state = {
		data: [],
		maxData: []
	};

	componentDidMount() {
		this.getCountriesData();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getCountriesData() {
		axios.get('https://covidtracking.com/api/states')
			.then(response => {
			this.objData = response;
			this.objData = this.objData.data;
			var dataset = [];
		this.objData.forEach((item, index) => { //
			// eslint-disable-next-line newline-after-var
			const iso = item.state,
					cases = item.positive,
					recovered = item.recovered,
					death = item.death;
					var colorCode = '', radValue;
					if(cases < 500){
						colorCode = "range1";
						radValue = 10;
					}else if(cases >= 500 && cases < 1000){
						colorCode = "range2"
						radValue = 12;
					}else if(cases >= 1000 && cases < 5000){
						colorCode = "range3"
						radValue = 14;
					}
					else if(cases >= 5000 && cases < 10000){
						colorCode = "range4"
						radValue = 16;
					}
					else if(cases >= 10000 && cases < 800000){
						colorCode = "range5"
						radValue = 18;
					}
			dataset[index] = { radius: radValue, fillKey: colorCode, recovered, death, centered: iso, cases };
		});
		const maxValue = dataset.sort((a,b) => b.cases - a.cases).slice(0,5);
		this.setState({ data: dataset, maxData: maxValue });
		this.bubbles=this.state.data
		})
		.catch(error => {
		console.log(error);
		});
	}

	setProjection(element) {
		const projection = d3.geo.equirectangular()
			.center([23, -3])
			.rotate([4.4, 0])
			.scale(200)
			.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
		const path = d3.geo.path()
			.projection(projection);

		return { path, projection };
	}

	render() {
		return (
            <div className="Home-map">
	  			<Datamap
			   		scope="usa"
					geographyConfig={{
						popupOnHover: true,
						highlightOnHover: true
					}}
					fills={{
						'range1': '#cc4731',
						'range2': '#306596',
						'range3': '#667faf',
						'range4': '#a9c0de',
						'range5': '#ca5e5b',
						'range6': '#eaa9a8',
						'defaultFill': '#eddc4e'
					}}
					bubbles={this.state.data}
					bubbleOptions={{
						popupTemplate: (geo, data) =>
							`<div class="hoverinfo">Cases: ${data.cases}\n<br>Deaths:  ${data.death}`
					}}
				/>
            </div>
		);
	}

}
