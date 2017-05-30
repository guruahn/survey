import React, { Component, PropTypes } from 'react';
import {PieChart} from 'react-d3';
class Query extends Component {
  constructor(props) {
      super(props);
      //https://reactiva.github.io/react-d3-website/

      this.setPieData = this.setPieData.bind(this);
      this.pieData = [];
  }

  setPieData(){
    let _this = this;
    let report = this.props.queryData.value.report;
    let sum = 0;
    Object.keys(report).forEach(function(label){
      sum += report[label];
    });
    Object.keys(report).forEach(function(label){
      _this.pieData.push({"label": label, "value":(report[label]*100/sum)})
    });
    console.log(this.pieData)
  }

  componentDidMount(){
    this.setPieData();
  }
  render() {

    return(
        <div>
          <h2>{this.props.queryData.value.question}</h2>
          <PieChart
            data= {this.pieData}
            width= {700}
            height= {400}
            radius={100}
            innerRadius={20}
            sectorBorderColor="white"

          />
        </div>
    );
  }
}
export default Query;
