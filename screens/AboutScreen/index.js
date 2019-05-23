import React from 'react';
import { Platform, Linking } from 'react-native';
import { updateAppState } from '../../actions/syncActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AboutScreen from './AboutScreen';
import Share from 'react-native-share';
import Constants from '../../assets/constants/Constants';

const shareOptions = {
  title: 'Share App via',
  message:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  url:
    Platform.OS == 'ios'
      ? Constants.APP_STORE_URL + Constants.BUNDLE_ID
      : Constants.PLAY_STORE_URL + Constants.BUNDLE_ID
};

class AboutScreenContainer extends React.Component {
  state = {};

  constructor(props) {
    super(props);

    this.openNotificationScreen = this.openNotificationScreen.bind(this);
    this.closeScreen = this.closeScreen.bind(this);
  }

  async openLink(url) {
    try {
      if (await InAppBrowser.isAvailable()) {
        // const result = await InAppBrowser.open(url)
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: 'gray',
          preferredControlTintColor: 'white',
          readerMode: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_right',
            endExit: 'slide_out_left'
          }
        });
        // Alert.alert(JSON.stringify(result))
      } else Linking.openURL(url);
    } catch (error) {
      // Alert.alert(error.message)
    }
  }

  static navigationOptions = {
    header: null,
    title: 'Story Screen'
  };

  openNotificationScreen() {
    this.props.navigation.push('InfoScreen');
  }

  shareApp = () => {
    Share.open(shareOptions);
    //this.openNotificationScreen();
  };

  closeScreen() {
    this.props.navigation.goBack();
    //  console.log('AboutScreen','Close Screen 1')
  }

  render() {
    return (
      <AboutScreen
        currentState={this.state}
        openInfoScreen={this.openNotificationScreen}
        closeScreen={this.closeScreen}
        shareApp={this.shareApp}
        openUrl={this.openLink}
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
)(AboutScreenContainer);
