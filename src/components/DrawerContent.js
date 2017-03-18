import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import { color } from '../constants/color';
import { menuItems } from '../constants/menuItems';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: color.white,
    flexDirection: 'column',
  },
  drawerHeader: {
    height: 130,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuItems: {
    paddingTop: 13,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  menuItem: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: width / 10,
  },
  menuItemActive: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.blueDark,
    paddingLeft: (width / 10),
  },
  menuItemText: {
    color: color.grayDark,
    fontSize: 18,
  },
});

class DrawerContent extends React.Component {
  static propTypes = {
    closeDrawer: React.PropTypes.func,
    setPage: React.PropTypes.func,
    page: React.PropTypes.string,
    dispatch: React.PropTypes.func,
  };
  static defaultProps = {
    closeDrawer: () => {},
    setPage: () => {},
    dispatch: () => {},
    page: '',
  };

  constructor(props) {
    super(props);

    this.menuItems = menuItems;

    this.state = {
      menuButtonIsBusy: false,
    };
  }

  render() {
    const {
      closeDrawer,
      setPage,
      page,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.drawerHeader} />
        <View style={styles.menuItems}>
          <View style={{ flex: 1 }}>
            {
              this.menuItems.map((item, id) => {
                return (
                  <TouchableOpacity
                    key={id}
                    style={[
                      page === item.id
                      ? styles.menuItemActive
                      : styles.menuItem,
                    ]}
                    disabled={this.state.menuButtonIsBusy}
                    onPress={() => {
                      if (
                        item.id === 'HOME'
                        ||
                        item.id === 'RESULT'
                      ) {
                        this.setState({ menuButtonIsBusy: true });
                        setPage(item.id);
                        TimerMixin.setTimeout(() => {
                          this.props.closeDrawer();
                          this.setState({ menuButtonIsBusy: false });
                        }, 50);
                      } else {
                        TimerMixin.setTimeout(() => {
                          this.props.closeDrawer();
                          this.setState({ menuButtonIsBusy: false });
                        }, 50);
                      }
                    }}
                  >
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </View>
      </View>
    );
  }
}

export default DrawerContent;
