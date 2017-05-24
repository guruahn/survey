import { combineReducers } from 'redux';
import mySurvey from '../surveys/MySurveysReducer';

const reducers = combineReducers({
  mySurvey
});

export default reducers;
