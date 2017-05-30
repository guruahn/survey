import React, { Component, PropTypes } from 'react';
import {PieChart} from 'react-d3';
class Query extends Component {
  constructor(props) {
      super(props);
      //https://reactiva.github.io/react-d3-website/
  }
  render() {
    var pieData = [
      {label: 'Margarita', value: 20.0},
      {label: 'John', value: 20.0},
      {label: 'Tim', value: 6.0 }
    ];
    return(
        <div>
          {this.props.queryData.value.question}
          <PieChart
            data= {pieData}
            width= {700}
            height= {400}
            radius={100}
            innerRadius={20}
            sectorBorderColor="white"
            title="Pie Chart"
          />
        </div>
    );
  }
}
export default Query;
