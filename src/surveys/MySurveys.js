//Dependencies
import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants';
import Loading from 'react-loading-animation';

//Components

//redux
import { connect } from 'react-redux';
import * as actions from './SurveysActions';

class MySurveys extends Component {
  constructor(props) {
    super(props);
    this.getSurveys = this.getSurveys.bind(this);
  }

  getSurveys(){
    let _this = this;
    let surveys = [];
    database.ref('/user-surveys/' + this.props.user.uid).once('value').then(function(snapshot) {
      snapshot.forEach(function(data){
        console.log("surveys", JSON.stringify({key:data.key, value:data.val()}));
        surveys.push({key:data.key, value:data.val()})
      });
      _this.props.handleSetMySurveys(surveys)
    });
  }

  componentDidMount(){
    this.getSurveys()
  }

  render() {
    return(
      <div className={"u-maxWidth700 u-marginAuto"} data-name={"wrapper"}>
        <h2>설문지 목록</h2>
        <div data-name="survey-list"><li>surveyList</li></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    surveys: state.mySurveys.surveys
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetMySurveys: (surveys) => { dispatch(actions.setMySurveys(surveys)) },
  };
};

export default MySurveys;
