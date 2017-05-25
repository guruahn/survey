import * as types from './SurveysActionTypes';

const initialState = {
  surveyDetail: ''
};

export default function surveyDetail(state = initialState, action){
    switch (action.type) {
      case types.SET_SURVEY:
        return { ...state, surveyDetail: action.survey }
      default:
        return state;
    }

}
