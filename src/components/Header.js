import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import { color } from '../constants/color';
import { menuIcon } from '../constants/menuIcon';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    height: Platform.OS === 'ios' ? 70 : 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.grayLight,
  },
  menuButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuIcon: {
    width: 18,
    height: 18,
    tintColor: color.blue,
  },
  titleText: {
    fontSize: 17,
    color: color.gray,
  },
  titleConteiner: {
    flex: 1,
    alignItems: Platform.OS !== 'ios' ? 'center' : 'flex-start',
    justifyContent: 'center'
  },
  capConteiner: {
    width: 50,
    height: 50,
  },
});

class Header extends React.Component {
  static propTypes = {
    openDrawer: React.PropTypes.func.isRequired,
    title: React.PropTypes.string,
    dispatch: React.PropTypes.func.isRequired,
  };
  static defaultProps = {
    openDrawer: () => {},
    dispatch: () => {},
    title: '',
    showSearch: false,
  };

  constructor(props) {
    super(props);
  }

  onPressMenu = () => {
    TimerMixin.requestAnimationFrame(() => {
      this.props.openDrawer();
    });
  };

  render() {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          animated
        />
        <TouchableOpacity
          style={styles.menuButton}
          onPress={this.onPressMenu}
        >
          <Image
            resizeMode={'cover'}
            style={styles.menuIcon}
            source={{ uri: menuIcon }}
          />
        </TouchableOpacity>
        <View style={styles.titleConteiner}>
          <Text style={[styles.titleText]}>
            {title}
          </Text>
        </View>
        <View style={styles.capConteiner} />
      </View>
    );
  }
}

export default Header;
