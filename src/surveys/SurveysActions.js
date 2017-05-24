import * as types from './SurveysActionTypes';



// 액션 생성자, 함수 이름 규칙은 camelCase

export function setMySurveys (surveys){
  return {
    type: types.SET_MY_SURVEYS,
    surveys
  };
}
