import { combineReducers } from 'redux';
import mySurveys from '../surveys/MySurveysReducer';
import surveyDetail from '../surveys/SurveyDetailReducer';
import participateReducer from '../participate/ParticipateReducer';
import reportsReducer from '../reports/ReportsReducer';
import participantsReducer from '../participants/ParticipantsReducer';
import participantReducer from '../participants/ParticipantReducer';

const reducers = combineReducers({
  mySurveys, surveyDetail, participateReducer, reportsReducer, participantsReducer, participantReducer
});

export default reducers;
