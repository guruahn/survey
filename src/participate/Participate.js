import React, { Component } from 'react';
import { database, firebaseAuth, datetimeFormat } from '../config/constants';
import Loading from 'react-loading-animation'

//Components
import Query from './Query.js';

//redux
import { connect } from 'react-redux';
import * as actions from './ParticipateActions';


class Participate extends Component {
  constructor(props) {
    super(props);
    this.getSurvey = this.getSurvey.bind(this);
    this.getQuerys = this.getQuerys.bind(this);
    this.getQueryAnswers = this.getQueryAnswers.bind(this);
  }

  getSurvey(){
    let _this = this
    let surveyRef = database.ref('/user-surveys/' + this.props.match.params.uid + '/' + this.props.match.params.surveyKey);
    //console.log('start getServey!!!!')
    surveyRef.once('value').then(function(snapshot, key) {
      console.log('key', snapshot.key)
      console.log('val', snapshot.val())
      _this.props.handleSetSurvey(snapshot.key, snapshot.val())
      _this.props.handleSetLoading(false)
    });
  }

  getQuerys(){
    let _this = this
    let surveyQuerysRef = database.ref('/survey-querys/' + this.props.match.params.surveyKey);
    surveyQuerysRef.once('value').then(function(snapshot, key) {
      //console.log(snapshot.val())
      let querys = []
      snapshot.forEach(function(data){
        //console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val()));
        querys.push({key:data.key, value:data.val()})
      });
      //console.log(myBooks)
      _this.getQueryAnswers(querys);
    });
  }

  getQueryAnswers(querys){
    let _this = this
    querys.forEach(function(query){
      //console.log('queryKey', query.key);
      //querys.push({key:data.key, value:data.val()})
      let queryAnswersRef = database.ref('/query-answers/' + query.key);
      queryAnswersRef.once('value').then(function(snapshot, key) {
        //console.log(snapshot.val())
        let answers = []
        snapshot.forEach(function(data){
          //console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val()));
          answers.push(data.val())
        });
        _this.props.handleAddQueryAnswer(query.key, answers);
        //console.log(myBooks)
      });
    });
    _this.props.handleSetQuerys(querys);
  }

  componentDidMount(){
    this.getSurvey()
    this.getQuerys()
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
              />
          )
        });
      }
    }

    if (this.props.loading) {
      return <div className="u-marginTop10em"><Loading type='balls' color='#F0AD4E' /></div>
    }
    if (this.props.surveyDetail.value.isDeployed === false) {
      return (
        <div className="u-maxWidth700 u-marginAuto">
          <p>접근불가한 설문조사입니다.</p>
        </div>
      )
    }

    if (this.props.isParticipate === false) {
      return (
        <div className="u-maxWidth700 u-marginAuto">
          <h1>{this.props.surveyDetail.value.title}</h1>
          <div>
            <input
              type="text" name="respondent" data-name="respondent"
              value={this.props.respondent}
              onChange={(e) => this.props.handleSetRespondent(e.target.value)}
              />
            <button
              onClick={() => this.props.handleSetIsParticipate(true)}
              >
              참여하기
            </button>
          </div>
        </div>
      )
    }
    return(
      <div className="u-maxWidth700 u-marginAuto">
        <h1>{this.props.surveyDetail.value.title}</h1>
        <div>
        참여중
        </div>
        <h2>질문</h2>
        {printQueryOfSurvey(this.props.surveyDetailQuerys)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    surveyDetail: state.participateReducer.surveyDetail,
    surveyDetailQuerys: state.participateReducer.surveyDetailQuerys,
    surveyDetailQuerysAnswers: state.participateReducer.surveyDetailQuerysAnswers,
    respondent: state.participateReducer.respondent,
    loading: state.participateReducer.loading,
    isParticipate: state.participateReducer.isParticipate,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetSurvey: (key, survey) => { dispatch(actions.setSurvey(key, survey)) },
    handleSetLoading: (state) => { dispatch(actions.setLoading(state)) },
    handleSetRespondent: (respondent) => { dispatch(actions.setRespondent(respondent)) },
    handleSetIsParticipate: (state) => { dispatch(actions.setIsParticipate(state)) },
    handleAddQueryAnswer: (queryKey, answer) => { dispatch(actions.addQueryAnswer(queryKey, answer)) },
    handleSetQuerys: (querys) => { dispatch(actions.setQuerys(querys)) },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Participate);
export { Participate as PureParticipate};
