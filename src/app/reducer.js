import { combineReducers } from 'redux';
import mySurveys from '../surveys/MySurveysReducer';
import surveyDetail from '../surveys/SurveyDetailReducer';

const reducers = combineReducers({
  mySurveys, surveyDetail
});

export default reducers;
