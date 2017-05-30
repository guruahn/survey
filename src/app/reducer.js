import { combineReducers } from 'redux';
import mySurveys from '../surveys/MySurveysReducer';
import surveyDetail from '../surveys/SurveyDetailReducer';
import participateReducer from '../participate/ParticipateReducer';
import reportsReducer from '../reports/ReportsReducer';

const reducers = combineReducers({
  mySurveys, surveyDetail, participateReducer, reportsReducer
});

export default reducers;
