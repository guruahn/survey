import { combineReducers } from 'redux';
import mySurveys from '../surveys/MySurveysReducer';
import surveyDetail from '../surveys/SurveyDetailReducer';
import participateReducer from '../participate/ParticipateReducer'
const reducers = combineReducers({
  mySurveys, surveyDetail, participateReducer
});

export default reducers;
