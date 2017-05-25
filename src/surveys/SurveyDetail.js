import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants';
import Loading from 'react-loading-animation';

import { connect } from 'react-redux';
import * as actions from './SurveysActions';

class SurveyDetail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
              <h1>설문지 작성</h1>
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
