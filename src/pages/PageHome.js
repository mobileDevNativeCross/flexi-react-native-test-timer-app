import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { color } from '../constants/color';
import { timeout } from '../constants/timeout';
import { base64Image } from '../constants/base64Image';
import { setTimerValue, startTimer, stopTimer, setTimerIsRunning } from '../actions/data';

const diameter = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  image: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    backgroundColor: 'transparent',
    color: color.gray,
    fontSize: 40,
  },
  buttonText: {
    backgroundColor: 'transparent',
    color: color.gray,
    fontSize: 30,
  },
  button: {
    width: diameter,
    height: 50,
    marginTop: 20,
    backgroundColor: color.white,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

class PageHome extends React.Component {
  static propTypes = {
    openDrawer: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
  };
  static defaultProps = {
    openDrawer: () => {},
    closeDrawer: () => {},
  };

  constructor(props) {
    super(props);
  }

  startTimer = () => {
    const { dispatch } = this.props;
    dispatch(startTimer(Date.now()));
    dispatch(setTimerIsRunning(true));
  };

  stopTimer = () => {
    const { timerId, dispatch } = this.props;
    dispatch(stopTimer(timerId));
    dispatch(setTimerIsRunning(false));
  };

  resetTimer = () => {
    const { dispatch } = this.props;
    dispatch(setTimerValue(timeout));
  };

  render() {
    const {
      openDrawer,
      closeDrawer,
      timerValue,
      timerIsRunning,
      timerId,
    } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: color.white }}>
        <Header
          title={'HOME'}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
        />
        <View style={styles.container}>
          <Image
            style={styles.image}
            resizeMode={'cover'}
            source={{uri: base64Image}}
          >
            <View style={styles.imageContainer}>
              <View style={styles.circle}>
                <Text style={styles.timerText}>{moment(timerValue).format('mm:ss')}</Text>
              </View>
              {
                timerValue !== 0
                ?
                  <View>
                    <TouchableOpacity style={styles.button} onPress={this.startTimer} disabled={timerIsRunning}>
                      <Text style={[styles.buttonText, {opacity: timerIsRunning ? 0.5 : 1}]}>START</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.stopTimer} disabled={!timerIsRunning}>
                      <Text style={[styles.buttonText, {opacity: !timerIsRunning ? 0.5 : 1}]}>STOP</Text>
                    </TouchableOpacity>
                  </View>
                :
                  <TouchableOpacity style={styles.button} onPress={this.resetTimer}>
                    <Text style={styles.buttonText}>RESET</Text>
                  </TouchableOpacity>
              }
            </View>
          </Image>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    timerValue: state.dataReducer.timerValue,
    timerIsRunning: state.dataReducer.timerIsRunning,
    timerId: state.dataReducer.timerId,
  };
}

export default connect(mapStateToProps)(PageHome);
