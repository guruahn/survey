import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants';
import Loading from 'react-loading-animation'

//Components

//redux
import { connect } from 'react-redux';
import * as actions from './ParticipantsActions';

class Participants extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>Participants</div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    surveyDetail: state.participateReducer.surveyDetail,
    surveyDetailQuerys: state.participateReducer.surveyDetailQuerys,
    surveyDetailQuerysAnswers: state.participateReducer.surveyDetailQuerysAnswers,
    loading: state.participateReducer.loading,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetSurvey: (key, survey) => { dispatch(actions.setSurvey(key, survey)) },
    handleSetLoading: (state) => { dispatch(actions.setLoading(state)) },
    handleAddQueryAnswer: (queryKey, answer) => { dispatch(actions.addQueryAnswer(queryKey, answer)) },
    handleSetQuerys: (querys) => { dispatch(actions.setQuerys(querys)) },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Participants);
export { Participants as PureParticipants};
