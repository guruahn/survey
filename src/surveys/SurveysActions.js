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
