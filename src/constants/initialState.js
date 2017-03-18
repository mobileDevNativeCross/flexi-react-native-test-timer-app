import { timeout } from './timeout';
export const initialState = {
  timerValue: timeout,
  timerIsRunning: false,
  timerId: null,
};
