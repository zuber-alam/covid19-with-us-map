/* global d3 */

import React from 'react';

import Datamap from 'react-datamaps';
import axios from 'axios';
import './Style.css';

const colors = d3.scale.category10();
var arrDataValues = [];
var objData = [];

export default class WorldMap extends React.Component {

	state = {
		data: {
		}
	};

	componentDidMount() {
		this.getCountriesData();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getCountriesData() {
		axios.get('https://corona.lmao.ninja/countries')
			.then(response => {
			this.objData = response;
			this.objData = this.objData.data;
			var dataset = {};

		this.objData.forEach(item => { //
			// eslint-disable-next-line newline-after-var
			const iso = item.countryInfo.iso3,
					value = item.cases,
					country = item.country,
					todayCases = item.todayCases,
					deaths = item.deaths,
					active = item.active;
					var colorCode = '';

					if(value < 100){
						colorCode = "mediumBlue";
					}else if(value >= 100 && value < 500){
						colorCode = "deepBlue"
					}else if(value >= 500 && value < 1000){
						colorCode = "justBlue"
					}
					else if(value >= 1000 && value < 5000){
						colorCode = "darkBlue"
					}
					else if(value >= 5000 && value < 80000){
						colorCode = "lightBlue"
					}
			dataset[iso] = { numberOfThings: value, fillKey: colorCode, country, deaths, todayCases, active };
		});
		this.setState({ data: dataset });
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
					scope="world"
					// setProjection={this.setProjection}
					data={this.state.data}
					fills={{
						'lightBlue': '#0018A8',
						'justBlue': '#306596',
						'deepBlue': '#667faf',
						'mediumBlue': '#89CFF0',
						'darkBlue': '#1F75FE',
						'defaultFill': '#FFF'
					}}
					projection="mercator"
					geographyConfig={{
						popupTemplate: (geo, data) =>
							`<div class="hoverinfo"><b>${data.country}</b> <br>Total Cases: ${data.numberOfThings}\n <br>Today Cases: ${data.todayCases} <br>Death: ${data.deaths} <br>Active: ${data.active} 
							 `
					}}
					updateChoroplethOptions={{ reset: false }}
				/>
            </div>
		);
	}

}
