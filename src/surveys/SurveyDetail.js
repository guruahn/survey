import React, { Component } from 'react';
import { database, firebaseAuth, datetimeFormat } from '../config/constants';
import Loading from 'react-loading-animation';
import moment from 'moment';
import Q from 'q';

import Query from './Query.js';

import { connect } from 'react-redux';
import * as actions from './SurveysActions';

class SurveyDetail extends Component {
  constructor(props) {
    super(props);
    this.getServey = this.getServey.bind(this);
    this.addQuery = this.addQuery.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.setSurveyTitle = this.setSurveyTitle.bind(this);
    this.saveSurveyTitle = this.saveSurveyTitle.bind(this);
    this.saveSurveyQueryTitle = this.saveSurveyQueryTitle.bind(this);

    this.setSurveyQueryTitle = this.setSurveyQueryTitle.bind(this);
    this.onChangeQueryAnswerType = this.onChangeQueryAnswerType.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
  }

  getServey(){
    let _this = this
    let surveyRef = database.ref('/user-surveys/' + this.props.user.uid + '/' + this.props.match.params.surveyKey);
    //console.log('start getServey!!!!')
    surveyRef.once('value').then(function(snapshot, key) {
      //console.log('key', snapshot.key)
      _this.props.handleSetSurvey(snapshot.key, snapshot.val())
    });
  }

  getQuerys(){
    let _this = this
    let surveyQuerysRef = database.ref('/survey-querys/' + this.props.match.params.surveyKey);
    //console.log('start getServey!!!!')
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
    //console.log('start getServey!!!!')
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
        _this.props.handleAddSurveyQueryAnswer(query.key, answers);
        //console.log(myBooks)

        _this.props.handleSetQuerys(querys);
      });
    });
  }

  addQuery(){
    const updates = {};
    let _this = this;
    let queryKey;
    let query;
    queryKey = database.ref().child('survey-querys').push().key;
    query = {
      "question": "질문을 입력하세요",
      "answerType": "yesOrNo",
      "order": 0
    };
    updates['/survey-querys/' + this.props.match.params.surveyKey + '/' + queryKey] = query
    database.ref().update(updates).then(function(){
      //console.log('query update complete')
      _this.props.handleAddSurveyQuery(queryKey, query)
      _this.addAnswer(queryKey)
    }, function(error) {
        console.log("Error query updating data:", error);
    });
  }

  addAnswer(queryKey){
    const updates = {};
    let _this = this;
    let answer = ['yes', 'no']
    updates['/query-answers/' + queryKey] = answer
    database.ref().update(updates).then(function(){
      //console.log('answer update complete')
      _this.props.handleAddSurveyQueryAnswer(queryKey, answer)
    }, function(error) {
        console.log("Error answer updating data:", error);
    });
  }

  setSurveyTitle(e){
    this.props.handleSetSurveyTitle(e.target.value, moment().format(datetimeFormat) )
  }
  saveSurveyTitle(){
    const updates = {};
    let _this = this;
    updates['/user-surveys/' + this.props.user.uid + '/' + this.props.surveyDetail.key] = this.props.surveyDetail.value
    database.ref().update(updates).then(function(){
      console.log('update complete')
    }, function(error) {
        console.log("Error updating data:", error);
    });
  }
  setSurveyQueryTitle(e, queryKey, index){
    //console.log('index',index)
    this.props.handleSetServeyQueryTitle(e.target.value, queryKey, index)
  }
  saveSurveyQueryTitle(index){
    const updates = {};
    let _this = this;
    updates['/survey-querys/' + this.props.surveyDetail.key + '/' + this.props.surveyDetailQuerys[index].key] = this.props.surveyDetailQuerys[index].value
    database.ref().update(updates).then(function(){
      console.log('update complete')
    }, function(error) {
        console.log("Error updating data:", error);
    });
  }
  onChangeQueryAnswerType(e, queryKey){
    //TODO e.target.value 가 yesOrrNo이면 선택항목 yes, no로 리셋.
    if(e.target.value == "yesOrNo"){
      this.props.handleSetSurveyQueryAnswerToYesOrNo(e.target.value, queryKey)
      //this.saveAnswer(queryKey, )TODO surveyDetailQuerysAnswers 구조변경 필요
    }
    this.props.handleSetSurveyQueryAnswerType(e.target.value, queryKey)
  }
  setAnswer(e, queryKey, index){
    this.props.handleSetSurveyAnswer(e.target.value, queryKey, index)
  }
  saveAnswer(queryKey, answerIndex){
    const updates = {};
    let _this = this;
    //console.log('answerIndex', this.props.surveyDetailQuerys)
    console.log('answerIndex', answerIndex)
    updates['/query-answers/' + queryKey] = this.props.surveyDetailQuerysAnswers[answerIndex].answer
    database.ref().update(updates).then(function(){
      console.log('update complete')
    }, function(error) {
        console.log("Error updating data:", error);
    });
  }

  componentDidMount(){
    this.getServey()
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
              onChangeQueryTitle={this.setSurveyQueryTitle}
              onBlurQueryTitle={this.saveSurveyQueryTitle}
              onChangeAnswerTitle={this.setAnswer}
              onBlurAnswerTitle={this.saveAnswer}
              onChangeQueryAnswerType={this.onChangeQueryAnswerType}
              />

          )
        });
      }
    }


    return(
      <div className="u-maxWidth700 u-marginAuto">
        <h1>설문지 작성</h1>
        <div>
          <input
            type="text" name="title" data-name="title"
            value={this.props.surveyDetail.value.title}
            onChange={this.setSurveyTitle}
            onBlur={this.saveSurveyTitle} />
        </div>
        <h2>질문</h2>
        {printQueryOfSurvey(this.props.surveyDetailQuerys)}
        <div>
          <button onClick={this.addQuery}>
            질문 추가
          </button>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    surveyDetail: state.surveyDetail.surveyDetail,
    surveyDetailQuerys: state.surveyDetail.surveyDetailQuerys,
    surveyDetailQuerysAnswers: state.surveyDetail.surveyDetailQuerysAnswers
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetSurvey: (key, survey) => { dispatch(actions.setSurvey(key, survey)) },
    handleSetQuerys: (querys) => { dispatch(actions.setQuerys(querys)) },
    handleSetQueryAnswers: (answers) => { dispatch(actions.setQueryAnswers(answers)) },
    handleAddSurveyQuery: (queryKey, query) => { dispatch(actions.addSurveyQuery(queryKey, query)) },
    handleAddSurveyQueryAnswer: (queryKey, answer) => { dispatch(actions.addSurveyQueryAnswer(queryKey, answer)) },
    handleSetSurveyTitle: (title, updateDatetime) => { dispatch(actions.setSurveyTitle(title, updateDatetime)) },
    handleSetServeyQueryTitle: (title, queryKey, index) => {dispatch(actions.setSurveyQueryTitle(title, queryKey, index)) },
    handleSetSurveyQueryAnswerType: (answerType, queryKey) => {dispatch(actions.setSurveyQueryAnswerType(answerType, queryKey)) },
    handleSetSurveyQueryAnswerToYesOrNo: (answerType, queryKey) => {dispatch(actions.setSurveyQueryAnswerToYesOrNo(answerType, queryKey)) },
    handleSetSurveyAnswer: (answer, queryKey, index) => {dispatch(actions.setSurveyAnswer(answer, queryKey, index)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyDetail);
export { SurveyDetail as PureSurveyDetail};
