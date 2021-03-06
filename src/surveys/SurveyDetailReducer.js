import * as types from './SurveysActionTypes';

const initialState = {
  surveyDetail: {
    "key":"",
    "value":{
      "title": "",
      "updateDatetime": "",
      "isDeployed": false
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
      case types.SET_INIT_SURVEY_ANSWERS:
        return {
          ...state, surveyDetailQuerysAnswers: [
            ...state.surveyDetailQuerysAnswers,
            {
              'queryKey': action.queryKey,
              'answer': action.answer
            }
          ]
        }
      case types.REMOVE_SURVEY_ANSWERS:
        return {
          ...state, surveyDetailQuerysAnswers: []
        }
      case types.SET_SURVEY_ANSWERS:
        return {
          ...state, surveyDetailQuerysAnswers: [
            ...state.surveyDetailQuerysAnswers.map(
              answerObj => answerObj.queryKey === action.queryKey ? {
                ...answerObj, answer: action.answers
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
      case types.GO_DEPLOY:
        return {
          ...state, surveyDetail:{
            ...state.surveyDetail, value: { isDeployed: true , updateDatetime: action.updateDatetime}
          }
        }
      
      default:
        return state;
    }

}
