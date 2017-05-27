import * as types from './SurveysActionTypes';

const initialState = {
  surveyDetail: {
    "title": "",
    "updateDatetime": "2017-05-25 23:40:17.097",
    "querys": {
      0 :
        {
          "question": "질문을 입력하세요",
          "answerType": "yesOrNo",
          "order": 0,
          'answers':{0:'yes', 1:'no'}
        }
    }
  },
  'surveyDetailQuerys':[],
  'surveyDetailQuerysAnswers':[]
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
