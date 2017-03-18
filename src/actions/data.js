import { timeout } from '../constants/timeout';
import BackgroundTimer from 'react-native-background-timer';
export const SET_TIMER_VALUE = 'SET_TIMER_VALUE';
export const SET_TIMER_IS_RUNNING = 'SET_TIMER_IS_RUNNING';
export const SET_TIMER_ID = 'SET_TIMER_ID';

export function setTimerValue(data) {
  return {
    type: SET_TIMER_VALUE,
    data,
  };
}

export function setTimerIsRunning(data) {
  return {
    type: SET_TIMER_IS_RUNNING,
    data,
  };
}

export function setTimerId(data) {
  return {
    type: SET_TIMER_ID,
    data,
  };
}

export const startTimer = (data) => (dispatch) => {
  let startTime = data;
  const timeout_ = timeout;
  dispatch(setTimerValue(timeout_));
  const id = BackgroundTimer.setInterval(() => {
    const currentTime = Date.now();
    if (timeout_ - (currentTime - startTime) < 1000) {
      BackgroundTimer.clearInterval(id);
      dispatch(setTimerIsRunning(false));
      dispatch(setTimerId(null));
      dispatch(setTimerValue(0));
    } else {
      dispatch(setTimerValue(timeout_ - (currentTime - startTime)));
    }
  }, 1000);
  dispatch(setTimerId(id));
}

export const stopTimer = (id) => (dispatch) => {
  BackgroundTimer.clearInterval(id);
}





