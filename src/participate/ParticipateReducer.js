import * as types from './ParticipateActionTypes';

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
  isParticipate: false
};

export default function participateReducer(state = initialState, action){
    switch (action.type) {
      case types.SET_SURVEY:
        return { ...state, surveyDetail: {key: action.key, value: action.survey }}
      case types.SET_LOADING:
        return { ...state, loading: action.state }
      case types.SET_RESPONDENT:
        return { ...state, respondent: action.respondent }
      case types.SET_IS_PARTICIPATE:
        return { ...state, isParticipate: action.state}

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
