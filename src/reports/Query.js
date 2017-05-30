import React, { Component, PropTypes } from 'react';
import RC2 from 'react-chartjs2';

class Query extends Component {
  constructor(props) {
      super(props);
      //http://houjiazong.github.io/react-chartjs2/

      this.setPieData = this.setPieData.bind(this);
      this.pieData = {"labels":[], "datasets":[{"data":[]}]};
      this.tableData = [];
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
      _this.tableData.push({
        "label": label,
        "value":report[label],
        "percent":(report[label]*100/sum)
      });
    });
  }

  componentDidMount(){
    this.setPieData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextProps.chartType', nextProps.chartType[this.props.queryData.key]);
    console.log('this.props.chartType', this.props.chartType[this.props.queryData.key]);
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }

  render() {
    const printChart = () => {
      let chartType = "pieChart";
      //console.log(this.props.chartType)
      if( this.props.chartType ){
        chartType = this.props.chartType[this.props.queryData.key];
      }
      if(chartType === "pieChart"){
        return (
          <RC2 data={this.pieData} type={"pie"}/>
        )
      }else if(chartType === "barChart"){
        return (
          <RC2 data={this.pieData} type={"bar"}/>
        )
      }else if(chartType === "table"){
        return (
          <table>
            <thead>
              <tr>
                <th>항목</th>
                <th>응답자수</th>
                <th>응답비율</th>
              </tr>
            </thead>
            <tbody>
              {printTableChart()}
            </tbody>
          </table>
        )
      }
    };

    const printTableChart = () => {
      return this.tableData.map((row, i) => {
        return (
          <tr key={i}>
            <td>{row.label}</td>
            <td>{row.value}</td>
            <td>{row.percent}</td>
          </tr>
        )
      });
    }
    return(
        <div>
          <h2>{this.props.queryData.value.question}</h2>
          <select
            onChange={(e) => this.props.setChartType(this.props.queryData.key, e.target.value)}
            value={this.props.chartType[this.props.queryData.key]}>
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
