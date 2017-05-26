import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants';
import Loading from 'react-loading-animation';

import { connect } from 'react-redux';
import * as actions from './SurveysActions';

class SurveyDetail extends Component {
  constructor(props) {
    super(props);
    this.getServey = this.getServey.bind(this);
  }

  getServey(){
    let _this = this
    let surveyRef = database.ref('/user-surveys/' + this.props.user.uid + '/' + this.props.match.params.surveyKey);
    console.log('start getServey!!!!')
    surveyRef.once('value').then(function(snapshot, key) {
      //console.log(snapshot.val())
      _this.props.handleSetSurvey(snapshot.val())
    });
  }

  componentDidMount(){
    this.getServey()
  }

  render() {
    const printSurvey = (survey) => {
      //console.log('survey', survey)
      if(typeof survey === 'undefined'){
        return <Loading />
      }else{
        return <div data-name="title">{survey.title}</div>
      }
    };
    return(
      <div className="u-maxWidth700 u-marginAuto">
        <h1>설문지 작성</h1>
        {printSurvey(this.props.surveyDetail)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    surveyDetail: state.surveyDetail.surveyDetail
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetSurvey: (survey) => { dispatch(actions.setSurvey(survey)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyDetail);
export { SurveyDetail as PureSurveyDetail};
