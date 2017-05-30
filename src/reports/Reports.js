import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth, datetimeFormat } from '../config/constants';
import Loading from 'react-loading-animation'
import moment from 'moment';

//Components
import Query from './Query.js';

//redux
import { connect } from 'react-redux';
import * as actions from './ReportsActions';

class Reports extends Component {
  constructor(props) {
    super(props);
    this.getSurvey = this.getSurvey.bind(this);
    this.getQuerys = this.getQuerys.bind(this);
    this.getQueryAnswers = this.getQueryAnswers.bind(this);
    this.getParticipate = this.getParticipate.bind(this);
    this.getParticipateTodayCount = this.getParticipateTodayCount.bind(this);
  }

  getSurvey(){
    let _this = this;
    let surveyRef = database.ref('/user-surveys/' + this.props.match.params.uid + '/' + this.props.match.params.surveyKey);
    surveyRef.once('value').then(function(snapshot, key) {
      _this.props.handleSetSurvey(snapshot.key, snapshot.val());
      _this.getParticipate();
    });
  }

  getQuerys(){
    let _this = this
    let surveyQuerysRef = database.ref('/survey-querys/' + this.props.match.params.surveyKey);
    surveyQuerysRef.once('value').then(function(snapshot, key) {
      let querys = [];
      snapshot.forEach(function(data){
        //console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val()));
        querys.push({key:data.key, value:data.val()});
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

  getParticipate(){
    let _this = this
    let surveyParticipateRef = database.ref('/survey-participate/' + this.props.match.params.surveyKey);
    surveyParticipateRef.once('value').then(function(snapshot, key) {
      //_this.props.handleInitRespondentAnswers(respondentAnswers);
      _this.getParticipateTodayCount();
      _this.props.handleSetAllCount(snapshot.numChildren());
    });
  }

  getParticipateTodayCount(){
    let yesterday =  moment().subtract(1, 'days').format("YYYY-MM-DD") + " 00:00:00.000";
    let yesterdayTimestamp = moment(yesterday).valueOf();
    this.props.handleSetLoading(false);
    let _this = this
    let surveyParticipateRef = database.ref('/survey-participate/' + this.props.match.params.surveyKey);
    surveyParticipateRef.orderByChild("updateDatetime").startAt(yesterdayTimestamp).once('value').then(function(snapshot, key) {
      //_this.props.handleInitRespondentAnswers(respondentAnswers);
      _this.props.handleSetLoading(false);
      _this.props.handleSetTodayCount(snapshot.numChildren());
    });
  }

  componentDidMount(){
    this.getSurvey();
    this.getQuerys();
  }

  render() {

    const printQueryOfSurvey = (querys, answers) => {
      if(querys && querys.length > 0){
        return querys.map((query, i) => {
          return (
            <Query key={i} index={i}
              queryData={query}
              answerData={this.props.surveyDetailQuerysAnswers}
              />
          )
        });
      }
    }

    return(
        <div className="u-maxWidth700 u-marginAuto">
          Reports {this.props.match.params.surveyKey}
          <div>
            총 참여자 : {this.props.allCount} |
            오늘 참여자 : {this.props.todayCount}
          </div>
          <div>
            {printQueryOfSurvey(this.props.surveyDetailQuerys)}
          </div>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    surveyDetail: state.reportsReducer.surveyDetail,
    surveyDetailQuerys: state.reportsReducer.surveyDetailQuerys,
    surveyDetailQuerysAnswers: state.reportsReducer.surveyDetailQuerysAnswers,
    loading: state.reportsReducer.loading,
    respondentAnswers: state.reportsReducer.respondentAnswers,
    allCount: state.reportsReducer.allCount,
    todayCount: state.reportsReducer.todayCount
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetSurvey: (key, survey) => { dispatch(actions.setSurvey(key, survey)) },
    handleSetLoading: (state) => { dispatch(actions.setLoading(state)) },
    handleSetAllCount: (count) => { dispatch(actions.setAllCount(count)) },
    handleSetTodayCount: (count) => { dispatch(actions.setTodayCount(count)) },
    handleSetQuerys: (querys) => { dispatch(actions.setQuerys(querys)) },
    handleSetRespondentAnswers: (queryKey, answers) => { dispatch(actions.setRespondentAnswers(queryKey, answers)) },
    handleAddQueryAnswer: (queryKey, answer) => { dispatch(actions.addQueryAnswer(queryKey, answer)) },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Reports);
export { Reports as PureReports};
