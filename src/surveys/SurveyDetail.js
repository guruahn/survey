import React, { Component } from 'react';
import { database, firebaseAuth, answerTypes } from '../config/constants';
import Loading from 'react-loading-animation';

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
    this.setSurveyQueryTitle = this.setSurveyQueryTitle.bind(this);
    this.setSurveyQueryAnswerType = this.setSurveyQueryAnswerType.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
  }

  getServey(){
    let _this = this
    let surveyRef = database.ref('/user-surveys/' + this.props.user.uid + '/' + this.props.match.params.surveyKey);
    //console.log('start getServey!!!!')
    surveyRef.once('value').then(function(snapshot, key) {
      //console.log(snapshot.val())
      _this.props.handleSetSurvey(snapshot.val())
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
      _this.props.handleSetQuerys(querys);
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
          answers.push({queryKey:query.key, answerKey:data.key, answer:data.val()})
        });
        //console.log(myBooks)
        _this.props.handleSetQueryAnswers(answers);
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
      //'answers':{0:'yes', 1:'no'}
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
    let answerKey;
    let answer;
    answerKey = database.ref().child('query-answers').push().key;
    answer = {
      0:'yes',
      1:'no'
    };
    updates['/query-answers/' + queryKey + '/' + answerKey] = answer
    database.ref().update(updates).then(function(){
      //console.log('answer update complete')
      _this.props.handleAddSurveyQueryAnswer(queryKey, answerKey, answer)
    }, function(error) {
        console.log("Error answer updating data:", error);
    });
  }

  setSurveyTitle(e){
    this.props.handleSetSurveyTitle(e.target.value)
  }
  setSurveyQueryTitle(e){
    const index = e.target.attributes.getNamedItem('data-index').value
    this.props.handleSetServeyQueryTitle(e.target.value, index)
  }
  setSurveyQueryAnswerType(e){
    const index = e.target.attributes.getNamedItem('data-index').value
    this.props.handleSetSurveyQueryAnswerType(e.target.value, index)
  }
  setAnswer(e){
    const queryIndex = e.target.attributes.getNamedItem('data-query-index').value
    const answerIndex = e.target.attributes.getNamedItem('data-answer-index').value
    this.props.handleSetSurveyAnswer(e.target.value, queryIndex, answerIndex)
  }

  componentDidMount(){
    this.getServey()
    this.getQuerys()
  }

  render() {

    const printQueryOfSurvey = (querys) => {
      console.log('surveyDetail', this.props.surveyDetailQuerys)
      if(querys && querys.length > 0){
        return querys.map((query, i) => {
          return (
            <Query key={i} data={query}/>
          )
        });
      }
    }
    const printQueryType = () => {
      return answerTypes.map((type, i)=>{
        return (
          <option value={type.value} key={i} >
            {type.label}
          </option>
        )

      })
    }
    const printAnswers = (answers, queryIndex) => {
      return answers.map((answer, i) => {
        //console.log(answer)
        return (
          <input
            value={answer}
            onChange={this.setAnswer}
            key={i}
            data-query-index={queryIndex}
            data-answer-index={i}/>
        )
      })
    }
    return(
      <div className="u-maxWidth700 u-marginAuto">
        <h1>설문지 작성</h1>
        <div>
          <input type="text" value={this.props.surveyDetail.title} onChange={this.setSurveyTitle} name="title" data-name="title"/>
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
    handleSetSurvey: (survey) => { dispatch(actions.setSurvey(survey)) },
    handleSetQuerys: (querys) => { dispatch(actions.setQuerys(querys)) },
    handleSetQueryAnswers: (answers) => { dispatch(actions.setQueryAnswers(answers)) },
    handleAddSurveyQuery: (queryKey, query) => { dispatch(actions.addSurveyQuery(queryKey, query)) },
    handleAddSurveyQueryAnswer: (queryKey, answerKey, answer) => { dispatch(actions.addSurveyQueryAnswer(queryKey, answerKey, answer)) },
    handleSetSurveyTitle: (title) => { dispatch(actions.setSurveyTitle(title)) },
    handleSetServeyQueryTitle: (title, index) => {dispatch(actions.setSurveyQueryTitle(title, index)) },
    handleSetSurveyQueryAnswerType: (answerType, index) => {dispatch(actions.setSurveyQueryAnswerType(answerType, index)) },
    handleSetSurveyAnswer: (answer, queryIndex, answerIndex) => {dispatch(actions.setSurveyAnswer(answer, queryIndex, answerIndex)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyDetail);
export { SurveyDetail as PureSurveyDetail};
