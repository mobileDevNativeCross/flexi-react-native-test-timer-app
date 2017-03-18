import React from 'react';
import {
  StyleSheet,
  View,
  InteractionManager,
} from 'react-native';
import Drawer from 'react-native-drawer';
import DrawerContent from '../components/DrawerContent';

import PageHome from '../pages/PageHome';
import PageResult from '../pages/PageResult';
import { color } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.red,
  },
});

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.pages = [
      'HOME',
      'RESULT',
    ];

    this.state = {
      page: this.pages[0],
      ready: false,
    };

    this.setPage = (page) => {
      this.setState({ page });
    };

    this.drawerRef = {};
  }

  componentWillMount() {
    
    this.openDrawer = () => {
      InteractionManager.runAfterInteractions(() => {
        this.drawerRef.open();
      });
    }

    this.closeDrawer = () => {
      InteractionManager.runAfterInteractions(() => {
        this.drawerRef.close();
      });
    }
  }

  render() {
    return (
      <Drawer
        ref={c => this.drawerRef = c}
        type="static"
        content={<DrawerContent closeDrawer={this.closeDrawer} setPage={this.setPage} page={this.state.page} drawer={this.drawerRef}/>}
        openDrawerOffset={0.40}
        tapToClose={true}
        panOpenMask={0.1}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <View style={styles.container}>
          {
            this.state.page === 'HOME'
            &&
            <PageHome openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} />
          }
          {
            this.state.page === 'RESULT'
            &&
            <PageResult openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} />
          }
        </View>
      </Drawer>
    );
  }
}

export default Main;
