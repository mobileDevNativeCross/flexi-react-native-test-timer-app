import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import Main from './main';
import { color } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});


class Root extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Main />
      </View>
    );
  }
}

export default Root;
