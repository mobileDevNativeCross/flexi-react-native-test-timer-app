import * as types from '../actions/data';
import { initialState } from '../constants/initialState';

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_TIMER_VALUE: {
      return Object.assign({}, state, { timerValue: action.data });
    }
    case types.SET_TIMER_IS_RUNNING: {
      return Object.assign({}, state, { timerIsRunning: action.data });
    }
    case types.SET_TIMER_ID: {
      return Object.assign({}, state, { timerId: action.data });
    }    
    default:
      return state;
  }
}
