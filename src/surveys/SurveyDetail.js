import React, { Component } from 'react';
import { database, firebaseAuth } from '../config/constants';
import Loading from 'react-loading-animation';

import { connect } from 'react-redux';
import * as actions from './SurveysActions';

class SurveyDetail extends Component {
  constructor(props) {
    super(props);
    this.getServey = this.getServey.bind(this);
    this.setSurveyTitle = this.setSurveyTitle.bind(this);
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

  componentDidMount(){
    this.getServey()
  }

  render() {

    const printQueryOfSurvey = (querys) => {
      if(querys && querys.length > 0){
        return querys.map((query, i) => {
          return (
            <div data-name="query" key={i}>

            </div>
          )
        });
      }
    }
    return(
      <div className="u-maxWidth700 u-marginAuto">
        <h1>설문지 작성</h1>
        <div>
          <input type="text" value={this.props.surveyDetail.title} onChange={this.setSurveyTitle} name="title" data-name="title"/>
        </div>
        {printQueryOfSurvey(this.props.surveyDetail.query)}
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
    handleSetSurveyTitle: (title) => { dispatch(actions.setSurveyTitle(title))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyDetail);
export { SurveyDetail as PureSurveyDetail};
