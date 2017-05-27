import * as types from './SurveysActionTypes';



// 액션 생성자, 함수 이름 규칙은 camelCase

export function setMySurveys (surveys){
  return {
    type: types.SET_MY_SURVEYS,
    surveys
  };
}

export function setSurvey (survey){
  return {
    type: types.SET_SURVEY,
    survey
  }
}

export function setQuerys (querys){
  return {
    type: types.SET_QUERYS,
    querys
  }
}

export function setQueryAnswers (answers){
  return {
    type: types.SET_QUERY_ANSWERS,
    answers
  }
}

export function addSurveyQuery (queryKey, query){
  return {
    type: types.ADD_SURVEY_QUERY,
    queryKey, query
  }
}

export function addSurveyQueryAnswer (queryKey, answerKey, answer){
  return {
    type: types.ADD_SURVEY_QUERY_ANSWER,
    queryKey, answerKey, answer
  }
}

export function setSurveyTitle (title){
  return {
    type: types.SET_SURVEY_TITLE,
    title
  }
}

export function setSurveyQueryTitle (title, index){
  return {
    type: types.SET_SURVEY_QUERY_TITLE,
    title, index
  }
}

export function setSurveyQueryAnswerType (answerType, index){
  return {
    type: types.SET_SURVEY_QUERY_ANSWER_TYPE,
    answerType, index
  }
}

export function setSurveyAnswer (answer, queryIndex, answerIndex){
  return {
    type: types.SET_SURVEY_ANSWER,
    answer, queryIndex, answerIndex
  }
}
