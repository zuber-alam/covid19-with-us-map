/* global d3 */

import React from 'react';

import C3Chart from 'react-c3js';
import 'c3/c3.css';
import { StatsCard } from "tabler-react";
import axios from 'axios';
import './Style.css';

export default class USChart extends React.Component {

	state = {
		data: {columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
          ]},
		
	};

	componentDidMount() {
		// this.getCountriesData();
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
            <div className="chart">
                <StatsCard
                      layout={2}
                      movement={5}
                      total="423"
                      label="Users online"
                      chart={
                        <C3Chart
                          style={{ height: "100%" }}
                          padding={{
                            bottom: -10,
                            left: -1,
                            right: -1,
                          }}
                          data={{
                            names: {
                              data1: "Users online",
                            },
                            columns: [["data1", 30, 40, 10, 40, 12, 22, 40]],
                            type: "area",
                          }}
                          legend={{
                            show: false,
                          }}
                          transition={{
                            duration: 0,
                          }}
                          point={{
                            show: false,
                          }}
                          tooltip={{
                            format: {
                              title: function(x) {
                                return "";
                              },
                            },
                          }}
                          axis={{
                            y: {
                              padding: {
                                bottom: 0,
                              },
                              show: false,
                              tick: {
                                outer: false,
                              },
                            },
                            x: {
                              padding: {
                                left: 0,
                                right: 0,
                              },
                              show: false,
                            },
                          }}
                          color={{
                            pattern: ["#467fcf"],
                          }}
                        />
                      }
                    />
            </div>
		);
	}

}
