import * as types from './SurveysActionTypes';

const initialState = {
  surveyDetail: {
    "title": "",
    "updateDatetime": "2017-05-25 23:40:17.097",
    "query": [
      {
        "questioin": "",
        "answerType": "yesOrNo",
        "order": 0
      }
    ]
  }
};

export default function surveyDetail(state = initialState, action){
    switch (action.type) {
      case types.SET_SURVEY:
        return { ...state, surveyDetail: action.survey }
      case types.SET_SURVEY_TITLE:
        return {
          ...state, surveyDetail: {
            ...state.surveyDetail, title: action.title
          }
        }
      default:
        return state;
    }

}
