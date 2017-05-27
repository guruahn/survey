//Dependencies
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { database, firebaseAuth, datetimeFormat } from '../config/constants';
import Loading from 'react-loading-animation';
import moment from 'moment';

//Components
import Survey from './Survey'
import SurveyDetail from './SurveyDetail'

//redux
import { connect } from 'react-redux';
import * as actions from './SurveysActions';

class MySurveys extends Component {
  constructor(props) {
    super(props)
    this.getSurveys = this.getSurveys.bind(this)
    this.addSurvey = this.addSurvey.bind(this);
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

  addSurvey(){
    const updates = {};
    let _this = this;
    let surveyKey;
    surveyKey = database.ref().child('user-surveys').push().key;
    updates['/user-surveys/' + this.props.user.uid + '/' + surveyKey] = {
      "title": "설문제목을 입력하세요.",
      "updateDatetime": moment().format(datetimeFormat)
    };
    database.ref().update(updates).then(function(){
      console.log('update complete')
      _this.props.history.push('/mySurveys/' + surveyKey);
    }, function(error) {
        console.log("Error updating data:", error);
    });
  }

  componentDidMount(){
    this.getSurveys()
  }

  render() {
    const mapToComponent = (surveys) => {
      if(typeof surveys === 'undefined' || surveys.length === 0){
        return <Loading />
      }else{

        return surveys.map((survey, i) => {
          //console.log('survey', survey)
          return (
            <li className={"list-group-item"} data-name="item" key={survey.key}>
              <Survey
                underline={survey.value}
                />
            </li>
          )
        });
      }
    };
    return(
      <div className="u-maxWidth700 u-marginAuto">
        <h1>설문지 목록</h1>
        <div>
          <button onClick={this.addSurvey}>
            설문지 추가
          </button>
        </div>
        <div data-name="survey-list">
          <ul className={"list-group"}>{mapToComponent(this.props.surveys)}</ul>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MySurveys);
export { MySurveys as PureMySurveys};
