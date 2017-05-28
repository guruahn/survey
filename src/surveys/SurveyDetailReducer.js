import * as types from './SurveysActionTypes';

const initialState = {
  surveyDetail: {
    "key":"",
    "value":{
      "title": "",
      "updateDatetime": "2017-05-25 23:40:17.097"
    }
  },
  surveyDetailQuerys:[],
  surveyDetailQuerysAnswers:[]
};

export default function surveyDetail(state = initialState, action){
    switch (action.type) {
      case types.SET_SURVEY:
        return { ...state, surveyDetail: {key: action.key, value: action.survey }}
      case types.SET_SURVEY_TITLE:
        return {
          ...state, surveyDetail:{
            ...state.surveyDetail, value: { title: action.title , updateDatetime: action.updateDatetime}
          }
        }
      case types.SET_QUERYS:
        return {
          ...state,
          surveyDetailQuerys: action.querys
        }
      case types.SET_QUERY_ANSWERS:
        return {
          ...state,
          surveyDetailQuerysAnswers: action.answers
        }
      case types.ADD_SURVEY_QUERY:
        return {
          ...state, surveyDetailQuerys: [
            ...state.surveyDetailQuerys,
            {
              'key': action.queryKey,
              'value': action.query
            }
          ]
        }

      case types.ADD_SURVEY_QUERY_ANSWER:
        return {
          ...state, surveyDetailQuerysAnswers: [
            ...state.surveyDetailQuerysAnswers,
            {
              'queryKey': action.queryKey,
              'answerKey': action.answerKey,
              'answer': action.answer
            }
          ]
        }

      case types.SET_SURVEY_QUERY_TITLE:
        return {
          ...state, surveyDetailQuerys: [
            ...state.surveyDetailQuerys.map(
              query => query.key === action.queryKey ? {
                ...query, value: {
                  ...query.value, question: action.title
                }
              } : query)
          ]
        }

      case types.SET_SURVEY_ANSWER:
        return {
          ...state, surveyDetailQuerysAnswers: [
            ...state.surveyDetailQuerysAnswers.map(
              answerObj => answerObj.queryKey === action.queryKey ? {
                ...answerObj, answer: [
                  ...answerObj.answer.map(
                    (answer, i) => i == action.index ? action.answer : answer
                  )
                ]
              } : answerObj)
          ]
        }
      case types.SET_SURVEY_QUERY_ANSWER_TYPE:
        return {
          ...state, surveyDetailQuerys: [
            ...state.surveyDetailQuerys.map(
              query => query.key === action.queryKey ? {
                ...query, value: {
                  ...query.value, answerType: action.answerType
                }
              } : query)
          ]
        }
      case types.SET_SURVEY_QUERY_ANSWER_TO_YES_OR_NO:
        return {
          ...state, surveyDetailQuerysAnswers: [
            ...state.surveyDetailQuerysAnswers.map(
              answerObj => answerObj.queryKey === action.queryKey ? {
                ...answerObj, answer: ["yes", "no"]
              } : answerObj)
          ]
        }
      default:
        return state;
    }

}
