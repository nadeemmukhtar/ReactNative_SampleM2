import React from 'react';
import { updateAppState } from '../../actions/syncActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfoScreen from './InfoScreen';
import RNFirebase from 'react-native-firebase';

class InfoScreenContainer extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.openAboutScreen = this.openAboutScreen.bind(this);
    this.closeScreen = this.closeScreen.bind(this);
  }

  static navigationOptions = {
    header: null,
    title: 'Story Screen'
  };

  async checkPermission() {
    const enabled = await RNFirebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await RNFirebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log('fcmToken', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } else {
      console.log('fcmToken', fcmToken);
    }
  }

  //2
  async requestPermission() {
    try {
      await RNFirebase.messaging().requestPermission();
      // User has authorised
      //this.getToken();
      this.closeScreen();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
      this.closeScreen();
    }
  }

  openAboutScreen() {
    // this.props.navigation.push("InfoScreen");
    this.checkPermission()
  }

  closeScreen() {
    this.props.navigation.popToTop();
  }

  render() {
    return (
      <InfoScreen
        currentState={this.state}
        openAboutScreen={this.openAboutScreen}
        closeScreen={this.closeScreen}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        updateAppState
      },
      dispatch
    )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(InfoScreenContainer);
