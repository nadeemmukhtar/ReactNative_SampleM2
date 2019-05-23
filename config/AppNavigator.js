/* eslint-disable no-multiple-empty-lines */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import StoryScreen from '../screens/StoryScreen';
import InfoScreen from '../screens/InfoScreen';
import AboutScreen from '../screens/AboutScreen';
import { fromBottom } from 'react-navigation-transitions';
import RNFirebase from 'react-native-firebase';

const AuthenticationNavigator = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    StoryScreen: { screen: StoryScreen },
    InfoScreen: { screen: InfoScreen },
    AboutScreen: { screen: AboutScreen }
  },
  {
    headerMode: 'none',
    initialRouteName: 'HomeScreen',
    transitionConfig: () => fromBottom(),
  }
);

/*const AuthenticationNavigator = createStackNavigator({
    //SlideFromRight: { screen: SlideFromRightScreen },
    Base: {screen: HomeScreen},
    CollapseExpand: {screen: StoryScreen},
    CollapseExpand: {screen: StoryScreen},
}, {
    initialRouteName: 'Base',
    headerMode: "screen",
    mode: "card",
    transitionConfig: TransitionConfiguration,
});*/

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 5000,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene;
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: SlideFromRight(index, position, width)
      }[transition];
    }
  };
};
let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  });
  const slideFromRight = { transform: [{ translateX }] };
  return slideFromRight;
};

let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1]
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1]
  });

  return {
    opacity,
    transform: [{ scaleY }]
  };
};

const AppNavigator = createAppContainer(AuthenticationNavigator);

class AppNavigatorContainer extends Component {
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator />
        {this.props.isLoading ? <Loader /> : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.appState.isLoading
  };
}

export default connect(
  mapStateToProps,
  null
)(AppNavigatorContainer);
