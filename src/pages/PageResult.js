import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { color } from '../constants/color';
import { base64Image } from '../constants/base64Image';
import { setTimerValue, startTimer, stopTimer, setTimerIsRunning } from '../actions/data';

const diameter = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    backgroundColor: 'transparent',
    color: color.gray,
    fontSize: 40,
  },
});

class PageResult extends React.Component {
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

  render() {
    const {
      openDrawer,
      closeDrawer,
      timerValue,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title={'RESULT'}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
        />
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.timerText}>{moment(timerValue).format('mm:ss')}</Text>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    timerValue: state.dataReducer.timerValue,
  };
}

export default connect(mapStateToProps)(PageResult);
