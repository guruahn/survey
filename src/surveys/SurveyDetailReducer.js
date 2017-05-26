import * as types from './SurveysActionTypes';

const initialState = {
  surveyDetail: {
    "title": "",
    "updateDatetime": "2017-05-25 23:40:17.097",
    "querys": [
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
      case types.SET_SURVEY_QUERY_TITLE:
        return {
          ...state, surveyDetail: {
            ...state.surveyDetail, querys: [
              ...state.surveyDetail.querys.filter((query, i) => {
                if( i === Number(action.index) ) {
                  query.question = action.title
                  return query
                }
              })
            ]
          }
        }
      case types.SET_SURVEY_QUERY_ANSWER_TYPE:
        return {
          ...state, surveyDetail: {
            ...state.surveyDetail, querys: [
              ...state.surveyDetail.querys.filter((query, i) => {
                if( i === Number(action.index) ) {
                  query.answerType = action.answerType
                  return query
                }
              })
            ]
          }
        }
      default:
        return state;
    }

}
