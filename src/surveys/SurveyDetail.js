import React, { Component } from 'react';
import { database, firebaseAuth, answerTypes } from '../config/constants';
import Loading from 'react-loading-animation';

import { connect } from 'react-redux';
import * as actions from './SurveysActions';

class SurveyDetail extends Component {
  constructor(props) {
    super(props);
    this.getServey = this.getServey.bind(this);
    this.setSurveyTitle = this.setSurveyTitle.bind(this);
    this.setSurveyQueryTitle = this.setSurveyQueryTitle.bind(this);
    this.setSurveyQueryAnswerType = this.setSurveyQueryAnswerType.bind(this);
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

  componentDidMount(){
    this.getServey()
  }

  render() {

    const printQueryOfSurvey = (querys) => {
      if(querys && querys.length > 0){
        return querys.map((query, i) => {
          return (
            <div data-name="query" key={i}>
              <lable>질문내용</lable><input type="text" value={query.question} onChange={this.setSurveyQueryTitle}
              data-index={i} />
              <label>답변형태</label>
              <select
                value={query.answerType}
                onChange={this.setSurveyQueryAnswerType}
                data-index={i}>{printQueryType()}</select>
              <label>선택항목</label>
            </div>
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
    return(
      <div className="u-maxWidth700 u-marginAuto">
        <h1>설문지 작성</h1>
        <div>
          <input type="text" value={this.props.surveyDetail.title} onChange={this.setSurveyTitle} name="title" data-name="title"/>
        </div>
        <h2>질문</h2>
        {printQueryOfSurvey(this.props.surveyDetail.querys)}
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
    handleSetSurvey: (survey) => { dispatch(actions.setSurvey(survey)) },
    handleSetSurveyTitle: (title) => { dispatch(actions.setSurveyTitle(title))},
    handleSetServeyQueryTitle: (title, index) => {dispatch(actions.setSurveyQueryTitle(title, index))},
    handleSetSurveyQueryAnswerType: (answerType, index) => {dispatch(actions.setSurveyQueryAnswerType(answerType, index))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyDetail);
export { SurveyDetail as PureSurveyDetail};
