import * as types from './ReportsActionTypes';



// 액션 생성자, 함수 이름 규칙은 camelCase

export function setSurvey (key, survey){
  return {
    type: types.SET_SURVEY,
    key, survey
  };
}

export function setLoading (state) {
  return {
    type: types.SET_LOADING,
    state
  }
}
