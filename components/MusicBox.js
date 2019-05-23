import React from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { styles } from './styles';
import Slider from 'react-native-slider';

let deviceHieght = Dimensions.get('window').height;
deviceHieght = parseInt(deviceHieght);
import { dimens, IS_IPHONE_X } from '../config/styles';
var pausedIcon = require('../assets/images/pause_button.png');
var playedIcon = require('../assets/images/play_icon.png');

const MusicBox = ({
  currentState,
  expandModel,
  isPlay,
  playSong,
  pauseSong,
  sliderTouchStart,
  sliderTouchEnd,
  sliderOnValueChange,
  sliderValue,
  maxSliderValue
}) => (
  <Animatable.View animation="slideInUp" iterationCount={1}>
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Slider
        onTouchStart={sliderTouchStart}
        // onTouchMove={() => console.log('onTouchMove')}
        onTouchEnd={sliderTouchEnd}
        // onTouchEndCapture={() => console.log('onTouchEndCapture')}
        // onTouchCancel={() => console.log('onTouchCancel')}
        onValueChange={sliderOnValueChange}
        maximumValue={maxSliderValue}
        trackStyle={styles.track}
        thumbStyle={styles.thumb3}
        value={sliderValue}
        minimumTrackTintColor="#3896FD"
        thumbTouchSize={{ width: 6, height: 6 }}
        style={{ width: '100%', height: 2 }}
      />

      <View
        style={{
          width: '100%',
          height: IS_IPHONE_X ? 130 : 110,
          backgroundColor: '#efeff4',
          zIndex: 10,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: IS_IPHONE_X ? 10 : 0
        }}
      >
        <View
          style={{
            width: '90%',
            height: IS_IPHONE_X ? 100 : 80,
            flexDirection: 'row',
            marginTop: 3
          }}
        >
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={{ width: '15%', marginRight: 10 }}>
              <Image
                resizeMode={'stretch'}
                source={{
                  uri: currentState.activeStory
                    ? currentState.activeStory.small_image
                    : ''
                }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.4,
                  shadowRadius: 5
                }}
              />
            </View>
            <View style={{ width: '60%', height: '60%' }}>
              <TouchableOpacity
                onPress={() => expandModel()}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop:-5
                }}
              >
                <Image
                  resizeMode={'stretch'}
                  source={require('../assets/images/arrow_down.png')}
                  style={{
                    width: 35,
                    height: 25,
                    transform: [{ rotate: '180deg' }]
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  marginBottom: 10,
                  marginStart: 20,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Spectral-Bold'
                  }}
                >
                  {currentState.activeStory
                    ? currentState.activeStory.title
                    : ''}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    marginTop: 1
                  }}
                >
                  {currentState.activeStory
                    ? currentState.activeStory.sub_title
                    : ''}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginRight: 10,
                width: '20%',
                height: '60%',
                marginTop: 15,
                justifyContent: 'center',
                alignItems: 'flex-end'
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isPlay ? pauseSong() : playSong();
                }}
              >
                <Image
                  resizeMode={'contain'}
                  source={isPlay ? pausedIcon : playedIcon}
                  style={{
                    width: 45,
                    height: 45
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  </Animatable.View>
);
export default MusicBox;
