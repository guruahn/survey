import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth, datetimeFormat } from '../config/constants';
import Loading from 'react-loading-animation';
import moment from 'moment';
import { Link } from 'react-router-dom'

//Components

//redux
import { connect } from 'react-redux';
import * as actions from './ParticipantsActions';

class Participants extends Component {
  constructor(props) {
    super(props);
    this.getSurvey = this.getSurvey.bind(this);
    this.getSurveyParticipate = this.getSurveyParticipate.bind(this);
  }

  getSurvey(){
    let _this = this;
    let surveyRef = database.ref('/user-surveys/' + this.props.match.params.uid + '/' + this.props.match.params.surveyKey);
    surveyRef.once('value').then(function(snapshot, key) {
      _this.props.handleSetSurvey(snapshot.key, snapshot.val());
      _this.props.handleSetLoading(false);
    });
  }

  getSurveyParticipate(){
    let _this = this;
    let participate = [];
    let surveyParticipateRef = database.ref('/survey-participate/' + this.props.match.params.surveyKey);
    surveyParticipateRef.once('value').then(function(snapshot){
      snapshot.forEach(function(data){
        //console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val()));
        participate.push({"key": data.key, "value": data.val()});
      });
      _this.props.handleSetSurveyParticipate(participate);
    });

  }

  componentDidMount(){
    this.getSurvey();
    this.getSurveyParticipate();
  }

  render() {
    const printParticipate = (participants) => {
      if(typeof participants !== 'undefined' && participants.length > 0){
        return participants.map((item, i) => {
          console.log('item', item)
          return (
            <tr data-name="item" key={item.key}>
              <td><Link to={`/participants/${this.props.match.params.surveyKey}/${this.props.match.params.uid}/${item.key}`} >{item.value.respondent}</Link></td>
              <td>{moment(item.value.updateDatetime).format(datetimeFormat)}</td>
            </tr>
          )
        });
      }
    };
    return(
      <div className="u-maxWidth700 u-marginAuto">
        <h1>참여자로그 : {this.props.surveyDetail.value.title}</h1>
        <table>
          <thead>
            <tr>
              <th>참여자</th>
              <th>참여시각</th>
            </tr>
          </thead>
          <tbody>
            {printParticipate(this.props.participants)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    surveyDetail: state.participantsReducer.surveyDetail,
    surveyDetailQuerys: state.participantsReducer.surveyDetailQuerys,
    surveyDetailQuerysAnswers: state.participantsReducer.surveyDetailQuerysAnswers,
    loading: state.participantsReducer.loading,
    participants: state.participantsReducer.participants,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetSurvey: (key, survey) => { dispatch(actions.setSurvey(key, survey)) },
    handleSetLoading: (state) => { dispatch(actions.setLoading(state)) },
    handleAddQueryAnswer: (queryKey, answer) => { dispatch(actions.addQueryAnswer(queryKey, answer)) },
    handleSetQuerys: (querys) => { dispatch(actions.setQuerys(querys)) },
    handleSetSurveyParticipate: (participate) => { dispatch(actions.setSurveyParticipate(participate)) },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Participants);
export { Participants as PureParticipants};
