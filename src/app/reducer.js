import { combineReducers } from 'redux';
import mySurveys from '../surveys/MySurveysReducer';

const reducers = combineReducers({
  mySurveys
});

export default reducers;
