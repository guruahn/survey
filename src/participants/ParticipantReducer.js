import * as types from './ParticipantsActionTypes';

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
  respondentInfo: {},
};

export default function participantReducer(state = initialState, action){
  switch (action.type) {
    case types.SET_SURVEY:
      return { ...state, surveyDetail: {key: action.key, value: action.survey }}
    case types.SET_LOADING:
      return { ...state, loading: action.state }
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
    case types.SET_SURVEY_PARTICIPATE:
      return {
        ...state, participants: action.participants
      }
    case types.SET_SURVEY_RESPONDENT_INFO:
      return {
        ...state, respondentInfo: action.respondentInfo
      }
    default:
      return state;
  }
}
