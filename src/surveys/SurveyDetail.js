import React, { Component } from 'react';
import { database, firebaseAuth, datetimeFormat, answerTypes } from '../config/constants';
import Loading from 'react-loading-animation';
import moment from 'moment';
import Q from 'q';

//Components
import Query from './Query.js';

//redux
import { connect } from 'react-redux';
import * as actions from './SurveysActions';

class SurveyDetail extends Component {
  constructor(props) {
    super(props);
    this.getSurvey = this.getSurvey.bind(this);
    this.addQuery = this.addQuery.bind(this);
    this.resetNewAnswer = this.resetNewAnswer.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.findAnswersByQuery = this.findAnswersByQuery.bind(this);
    this.setSurveyTitle = this.setSurveyTitle.bind(this);
    this.saveSurveyTitle = this.saveSurveyTitle.bind(this);
    this.saveSurveyQueryTitle = this.saveSurveyQueryTitle.bind(this);

    this.setSurveyQueryTitle = this.setSurveyQueryTitle.bind(this);
    this.onChangeQueryAnswerType = this.onChangeQueryAnswerType.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
    this.goDeploy = this.goDeploy.bind(this);
    // TODO update surveys updateDatetime, when updating anithing
    // TODO 수동 저장 버튼기능
    // TODO 질문/선택항목 삭제 기능
  }

  getSurvey(){
    let _this = this
    let surveyRef = database.ref('/user-surveys/' + this.props.user.uid + '/' + this.props.match.params.surveyKey);
    surveyRef.once('value').then(function(snapshot, key) {
      _this.props.handleSetSurvey(snapshot.key, snapshot.val())
    });
  }

  getQuerys(){
    let _this = this
    let surveyQuerysRef = database.ref('/survey-querys/' + this.props.match.params.surveyKey);
    surveyQuerysRef.once('value').then(function(snapshot, key) {
      let querys = []
      snapshot.forEach(function(data){
        querys.push({key:data.key, value:data.val()});
      });
      _this.getQueryAnswers(querys);
    });
  }

  getQueryAnswers(querys){
    let _this = this
    _this.props.handleRemoveSurveyAnswers();
    querys.forEach(function(query){
      let queryAnswersRef = database.ref('/query-answers/' + query.key);
      queryAnswersRef.once('value').then(function(snapshot, key) {
        let answers = [];
        snapshot.forEach(function(data){
          //console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val()));
          answers.push(data.val());
        });
        _this.props.handleSetInitSurveyAnswers(query.key, answers);
      });
    });
    _this.props.handleSetQuerys(querys);
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
    updates['/survey-querys/' + this.props.match.params.surveyKey + '/' + queryKey] = query;
    database.ref().update(updates).then(function(){
      //console.log('query update complete')
      _this.props.handleAddSurveyQuery(queryKey, query);
      _this.resetNewAnswer(queryKey);
    }, function(error) {
        console.log("Error query updating data:", error);
    });
  }

  resetNewAnswer(queryKey){
    const updates = {};
    let _this = this;
    let answer = ['yes', 'no'];
    updates['/query-answers/' + queryKey] = answer;
    database.ref().update(updates).then(function(){
      console.log('answer update complete');
      _this.props.handleSetInitSurveyAnswers(queryKey, answer);
    }, function(error) {
        console.log("Error answer updating data:", error);
    });
  }

  addAnswer(queryKey, index){
    const updates = {};
    let _this = this;
    let answers = this.findAnswersByQuery(queryKey);
    answers.push('새 선택항목');
    updates['/query-answers/' + queryKey] = answers;
    database.ref().update(updates).then(function(){
      //console.log('answer update complete')
      _this.props.handleSetSurveyAnswers(answers, queryKey);
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
      console.log('update complete');
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
    updates['/survey-querys/' + this.props.surveyDetail.key + '/' + this.props.surveyDetailQuerys[index].key] = this.props.surveyDetailQuerys[index].value;
    database.ref().update(updates).then(function(){
      console.log('update complete');
    }, function(error) {
        console.log("Error updating data:", error);
    });
  }

  findAnswersByQuery(queryKey){
    let answers = [];
    this.props.surveyDetailQuerysAnswers.map((item) => {
      if(item.queryKey === queryKey) answers = item.answer;
    })
    return answers;
  }

  onChangeQueryAnswerType(e, queryKey, index){
    //e.target.value 가 yesOrrNo이면 선택항목 yes, no로 리셋.
    if(e.target.value == "yesOrNo"){
      this.resetNewAnswer(queryKey);
    }
    this.props.handleSetSurveyQueryAnswerType(e.target.value, queryKey);
    this.saveAnswerType(e.target.value, queryKey, index)
  }
  saveAnswerType(answerType, queryKey, index){
    const updates = {};
    let _this = this;
    updates['/survey-querys/' + this.props.surveyDetail.key + '/' + queryKey] = {
      'answerType': answerType,
      'order': this.props.surveyDetailQuerys[index].value.order,
      'question': this.props.surveyDetailQuerys[index].value.question
    };
    database.ref().update(updates).then(function(){
      console.log('update complete');
    }, function(error) {
        console.log("Error updating data:", error);
    });
  }
  setAnswer(e, queryKey, index){
    this.props.handleSetSurveyAnswer(e.target.value, queryKey, index);
  }
  saveAnswer(queryKey, answerIndex){
    const updates = {};
    let _this = this;
    updates['/query-answers/' + queryKey] = this.props.surveyDetailQuerysAnswers[answerIndex].answer;
    database.ref().update(updates).then(function(){
      console.log('update complete');
    }, function(error) {
        console.log("Error updating data:", error);
    });
  }

  goDeploy(){
    const updates = {};
    let _this = this;
    updates['/user-surveys/' + this.props.user.uid + '/' + this.props.match.params.surveyKey + '/isDeployed'] = true;
    database.ref().update(updates).then(function(){
      console.log('update complete');
      _this.props.handleGoDeploy(moment().format(datetimeFormat))
    }, function(error) {
        console.log("Error updating data:", error);
    });
    this.setQueryReport();
  }

  setQueryReport(){
    let updates = {};
    let _this = this;
    this.props.surveyDetailQuerysAnswers.map((item, index) => {
      let reportSet = []
      this.props.surveyDetailQuerysAnswers[index].answer.map((answer) => {
        reportSet.push({"label": answer, "value": 0 })
      });
      updates['/survey-querys/' + this.props.match.params.surveyKey + '/' + item.queryKey + '/report'] = reportSet;
      database.ref().update(updates).then(function(){
        console.log('update complete');
        _this.props.handleGoDeploy(moment().format(datetimeFormat))
      }, function(error) {
          console.log("Error updating data:", error);
      });
    })

  }

  componentDidMount(){
    this.getSurvey()
    this.getQuerys()
  }

  render() {

    const printQueryOfSurvey = (querys, answers) => {
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
              onClickAddAnswer={this.addAnswer}
              isDeployed={this.props.surveyDetail.value.isDeployed}
              />
          )
        });
      }
    }


    return(
      <div className="u-maxWidth700 u-marginAuto">
        <h1>설문지 작성</h1>
        <div>
          <button
            disabled={this.props.surveyDetail.value.isDeployed ? "disabled" : false}>
            저장하기
          </button>
          <button
            onClick={this.goDeploy}
            disabled={this.props.surveyDetail.value.isDeployed ? "disabled" : false}>
            {this.props.surveyDetail.value.isDeployed ? "배포됨" : "배포하기"}
          </button>
        </div>
        <div>
          <input
            type="text" name="title" data-name="title"
            value={this.props.surveyDetail.value.title}
            onChange={this.setSurveyTitle}
            onBlur={this.saveSurveyTitle}
            disabled={this.props.surveyDetail.value.isDeployed ? "disabled" : false} />
        </div>
        <h2>질문</h2>
        {printQueryOfSurvey(this.props.surveyDetailQuerys)}
        <div>
          <button
            onClick={this.addQuery}
            disabled={this.props.surveyDetail.value.isDeployed ? "disabled" : false}>
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
    handleSetServeyQueryTitle: (title, queryKey, index) => { dispatch(actions.setSurveyQueryTitle(title, queryKey, index)) },
    handleSetSurveyQueryAnswerType: (answerType, queryKey) => { dispatch(actions.setSurveyQueryAnswerType(answerType, queryKey)) },
    handleSetSurveyAnswers: (answers, queryKey) => { dispatch(actions.setSurveyAnswers(answers, queryKey)) },
    handleSetSurveyAnswer: (answer, queryKey, index) => { dispatch(actions.setSurveyAnswer(answer, queryKey, index)) },
    handleSetInitSurveyAnswers: (queryKey, answer) => { dispatch(actions.setInitSurveyAnswers(queryKey, answer)) },
    handleGoDeploy: (updateDatetime) => { dispatch(actions.goDeploy(updateDatetime)) },
    handleRemoveSurveyAnswers: () => { dispatch(actions.removeSurveyAnswers()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyDetail);
export { SurveyDetail as PureSurveyDetail};
