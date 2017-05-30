import * as types from './ReportsActionTypes';



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

export function setAllCount (count){
  return {
    type: types.SET_ALL_COUNT,
    count
  }
}

export function setTodayCount (count){
  return {
    type: types.SET_TODAY_COUNT,
    count
  }
}

export function setQuerys (querys){
  return {
    type: types.SET_QUERYS,
    querys
  }
}

export function setRespondentAnswers (queryKey, answers){
  return {
    type: types.SET_RESPONDENT_ANSWERS,
    queryKey, answers
  }
}

export function addQueryAnswer (queryKey, answer){
  return {
    type: types.ADD_QUERY_ANSWER,
    queryKey, answer
  }
}
