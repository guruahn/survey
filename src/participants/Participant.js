import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth, datetimeFormat } from '../config/constants';
import Loading from 'react-loading-animation';
import moment from 'moment';
import { Link } from 'react-router-dom'

//Components
import Query from './Query.js';

//redux
import { connect } from 'react-redux';
import * as actions from './ParticipantsActions';

class Participant extends Component {
  constructor(props) {
    super(props);
    this.getSurvey = this.getSurvey.bind(this);
    this.getQuerys = this.getQuerys.bind(this);
    this.getQueryAnswers = this.getQueryAnswers.bind(this);
    this.getSurveyRespondentInfo = this.getSurveyRespondentInfo.bind(this);
  }

  getSurvey(){
    let _this = this;
    let surveyRef = database.ref('/user-surveys/' + this.props.match.params.uid + '/' + this.props.match.params.surveyKey);
    surveyRef.once('value').then(function(snapshot, key) {
      _this.props.handleSetSurvey(snapshot.key, snapshot.val());
      _this.props.handleSetLoading(false);
    });
  }

  getQuerys(){
    let _this = this
    let surveyQuerysRef = database.ref('/survey-querys/' + this.props.match.params.surveyKey);
    surveyQuerysRef.once('value').then(function(snapshot, key) {
      let querys = [];
      let respondentAnswers = {};
      snapshot.forEach(function(data){
        //console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val()));
        querys.push({key:data.key, value:data.val()});
        respondentAnswers[data.key] = [];
      });
      _this.getQueryAnswers(querys);
    });
  }

  getQueryAnswers(querys){
    let _this = this;
    querys.forEach(function(query){
      let queryAnswersRef = database.ref('/query-answers/' + query.key);
      queryAnswersRef.once('value').then(function(snapshot, key) {
        let answers = [];
        snapshot.forEach(function(data){
          //console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val()));
          answers.push(data.val());
        });
        _this.props.handleAddQueryAnswer(query.key, answers);
      });
    });
    _this.props.handleSetQuerys(querys);
  }

  getSurveyRespondentInfo(){
    let _this = this;
    let participate = [];
    let surveyParticipateRef = database.ref('/survey-participate/' + this.props.match.params.surveyKey + '/' + this.props.match.params.participateKey);
    surveyParticipateRef.once('value').then(function(snapshot){
      _this.props.handleSetSurveyRespondentInfo(snapshot.val());
    });

  }

  componentDidMount(){
    this.getSurvey();
    this.getSurveyRespondentInfo();
    this.getQuerys();
  }

  render() {

    const printQueryOfSurvey = (querys, answers) => {
      //console.log('surveyDetail', this.props.surveyDetailQuerys)
      if(querys && querys.length > 0){
        return querys.map((query, i) => {
          return (
            <Query key={i} index={i}
              queryData={query}
              answerData={this.props.surveyDetailQuerysAnswers}
              onChangeAnswer={this.onChangeAnswer}
              respondentAnswers={this.props.respondentInfo.respondentAnswers[query.key]}
              />
          )
        });
      }
    }
    if (this.props.loading) {
      return <div className="u-marginTop10em"><Loading type='balls' color='#F0AD4E' /></div>
    }
    return(
      <div className="u-maxWidth700 u-marginAuto">
        <h1>참여자로그 조회 : {this.props.surveyDetail.value.title}</h1>
        <div>{this.props.respondentInfo.respondent}님의 설문조사 참여 내역입니다.</div>
        <h2>질문</h2>
        {printQueryOfSurvey(this.props.surveyDetailQuerys)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    surveyDetail: state.participantReducer.surveyDetail,
    surveyDetailQuerys: state.participantReducer.surveyDetailQuerys,
    surveyDetailQuerysAnswers: state.participantReducer.surveyDetailQuerysAnswers,
    loading: state.participantReducer.loading,
    respondentInfo: state.participantReducer.respondentInfo,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetSurvey: (key, survey) => { dispatch(actions.setSurvey(key, survey)) },
    handleSetLoading: (state) => { dispatch(actions.setLoading(state)) },
    handleAddQueryAnswer: (queryKey, answer) => { dispatch(actions.addQueryAnswer(queryKey, answer)) },
    handleSetQuerys: (querys) => { dispatch(actions.setQuerys(querys)) },
    handleSetSurveyParticipate: (participate) => { dispatch(actions.setSurveyParticipate(participate)) },
    handleSetSurveyRespondentInfo: (respondentInfo) => { dispatch(actions.setSurveyRespondentInfo(respondentInfo)) },
    handleAddQueryAnswer: (queryKey, answer) => { dispatch(actions.addQueryAnswer(queryKey, answer)) },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Participant);
export { Participant as PureParticipant};
