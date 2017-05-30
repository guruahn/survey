import React, { Component, PropTypes } from 'react';
import RC2 from 'react-chartjs2';

class Query extends Component {
  constructor(props) {
      super(props);
      //https://reactiva.github.io/react-d3-website/

      this.setPieData = this.setPieData.bind(this);
      this.setBarData = this.setBarData.bind(this);
      this.pieData = {"labels":[], "datasets":[{"data":[]}]};
      this.barData = [];
  }

  setPieData(){
    let _this = this;
    let report = this.props.queryData.value.report;
    let sum = 0;
    Object.keys(report).forEach(function(label){
      sum += report[label];
    });
    Object.keys(report).forEach(function(label){
      _this.pieData.labels.push(label);
      _this.pieData.datasets[0].data.push(report[label]);
      //_this.pieData.push({"label": label, "value":(report[label]*100/sum)})
    });
  }

  setBarData(){
    let _this = this;
    let report = this.props.queryData.value.report;
    this.barData[0] = { "name": this.props.queryData.value.question, "value": [] }
    Object.keys(report).forEach(function(label){
      _this.barData[0].value.push({"x": 1, "y":  report[label]})
    });


    console.log(this.barData)
  }

  componentDidMount(){
    this.setPieData();
    this.setBarData();
  }
  render() {
    const printChart = () => {
      if(this.props.chartType === "pieChart"){
        return (
          <RC2 data={this.pieData} type={"pie"}/>
        )
      }else if(this.props.chartType === "barChart"){
        return (
          <RC2 data={this.pieData} type={"bar"}/>
        )
      }
    };
    return(
        <div>
          <h2>{this.props.queryData.value.question}</h2>
          <select
            onChange={(e) => this.props.setChartType(e.target.value)}
            value={this.props.chartType}>
            <option value="pieChart">파이차트</option>
            <option value="barChart">컬럼차트</option>
            <option value="table">테이블</option>
          </select>
          {printChart()}

        </div>
    );
  }
}
export default Query;
