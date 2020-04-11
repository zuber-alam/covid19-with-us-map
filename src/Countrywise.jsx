import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
// import { Grid, Image, Header, Item, Container, Statistic } from 'semantic-ui-react';
import axios from 'axios';

createTheme('solarized', {
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF'
    },
    background: {
      default: '#002b36'
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF'
    },
    divider: {
      default: '#002b36'
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)'
    }
  });

  // eslint-disable-next-line newline-after-var
  const columns = [
  {
    name: 'Country',
    selector: 'country',
    sortable: true
  },
  {
    name: 'Cases',
    selector: 'cases',
    sortable: true
  },
  {
    name: 'Deaths',
    selector: 'deaths',
    sortable: true
  }];

export default class Countrywise extends React.Component {
    state = {
		data: {
		}
    };

    componentDidMount() {
        this.getData();
        }
        getData() {
            axios.get('https://corona.lmao.ninja/countries')
                .then(response => {
                this.objData = response;
                this.objData = this.objData.data;
                this.setState({ data: this.objData });
            })
            .catch(error => {
            console.log(error);
            });
        }
    render() {
        return(
                <DataTable 
                data={this.state.data}
                title="Cases By Country"
                columns={columns}
                theme="solarized"
                pagination="true"
                />
        )
    }

}