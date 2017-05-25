import * as types from './SurveysActionTypes';

const initialState = {
  surveys: [],
};

export default function mySurveys(state = initialState, action){
  switch (action.type) {
    case types.SET_MY_SURVEYS:
      return {
        ...state,
        surveys: action.surveys
      }

    default:
      return state;

  }
}
