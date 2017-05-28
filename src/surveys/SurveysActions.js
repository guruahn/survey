import * as types from './SurveysActionTypes';



// 액션 생성자, 함수 이름 규칙은 camelCase

export function setMySurveys (surveys){
  return {
    type: types.SET_MY_SURVEYS,
    surveys
  };
}

export function setSurvey (key, survey){
  return {
    type: types.SET_SURVEY,
    key, survey
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

export function setSurveyTitle (title, updateDatetime){
  return {
    type: types.SET_SURVEY_TITLE,
    title, updateDatetime
  }
}

export function setSurveyQueryTitle (title, queryKey, index){
  return {
    type: types.SET_SURVEY_QUERY_TITLE,
    title, queryKey, index
  }
}

export function setSurveyQueryAnswerType (answerType, queryKey){
  return {
    type: types.SET_SURVEY_QUERY_ANSWER_TYPE,
    answerType, queryKey
  }
}

export function setSurveyQueryAnswerToYesOrNo (answerType, queryKey){
  return {
    type: types. SET_SURVEY_QUERY_ANSWER_TO_YES_OR_NO,
    answerType, queryKey
  }
}

export function setSurveyAnswer (answer, queryKey, answerKey, index){
  return {
    type: types.SET_SURVEY_ANSWER,
    answer, queryKey, answerKey, index
  }
}
