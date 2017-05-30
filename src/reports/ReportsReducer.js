import * as types from './ReportsActionTypes';

const initialState = {
  surveyDetail: {
    "key":"",
    "value":{
      "title": "",
      "updateDatetime": "",
      "isDeployed": true
    }
  },
  surveyDetailQuerys:[],
  surveyDetailQuerysAnswers:[],
  respondent: "",
  loading: true,
  respondentAnswers: {},
  allCount: 0,
  todayCount: 0
};

export default function reportsReducer(state = initialState, action){
    switch (action.type) {
      case types.SET_SURVEY:
        return { ...state, surveyDetail: {key: action.key, value: action.survey }}
      case types.SET_LOADING:
        return { ...state, loading: action.state }
      case types.SET_ALL_COUNT:
        return { ...state, allCount: action.count }
      case types.SET_TODAY_COUNT:
        return { ...state, todayCount: action.count }
      case types.ADD_QUERY_ANSWER:
        return {
          ...state, surveyDetailQuerysAnswers: [
            ...state.surveyDetailQuerysAnswers,
            {
              'queryKey': action.queryKey,
              'answer': action.answer
            }
          ]
        }
      case types.SET_QUERYS:
        return {
          ...state,
          surveyDetailQuerys: action.querys
        }
      default:
        return state;
    }

}
