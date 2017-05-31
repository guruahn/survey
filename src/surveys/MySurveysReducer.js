import * as types from './SurveysActionTypes';

const initialState = {
  surveys: [],
  loading: true,
  queryCounts: {}
};

export default function mySurveys(state = initialState, action){
  switch (action.type) {
    case types.SET_MY_SURVEYS:
      return {
        ...state,
        surveys: action.surveys
      }
    case types.SET_LOADING:
      return { ...state, loading: action.state }
    default:
      return state;
    case types.SET_QUERY_COUNT:
      return {
        ...state, queryCounts : action.count
      }
  }
}
