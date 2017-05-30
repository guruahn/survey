import * as types from './ParticipantsActionTypes';



// 액션 생성자, 함수 이름 규칙은 camelCase

export function setSurvey (key, survey){
  return {
    type: types.SET_SURVEY,
    key, survey
  };
}

export function setLoading (state){
  return {
    type: types.SET_LOADING,
    state
  }
}

export function setQuerys (querys){
  return {
    type: types.SET_QUERYS,
    querys
  }
}

export function addQueryAnswer (queryKey, answer){
  return {
    type: types.ADD_QUERY_ANSWER,
    queryKey, answer
  }
}

export function setSurveyParticipate (participants){
  return {
    type: types.SET_SURVEY_PARTICIPATE,
    participants
  }
}
