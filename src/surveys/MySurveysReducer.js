import * as types from './SurveysActionTypes';
import { database, firebaseAuth, datetimeFormat } from '../config/constants';

const initialState = {
  surveys: [],
};

export default function surveys(state = initialState, action){
  switch (action.type) {
    case types.SET_MY_SURVEYS:
      return {
        ...state,
        underlines: action.underlines
      }

    default:
      return state;

  }
}
