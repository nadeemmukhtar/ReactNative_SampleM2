import React from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import { styles } from './styles';
import CardView from 'react-native-cardview';
import * as Animatable from 'react-native-animatable';
import Slider from 'react-native-slider';
import VolumeSlider from 'react-native-volume-slider';
import { dimens, IS_IPHONE_X } from '../config/styles';

let deviceHieght = Dimensions.get('window').height;
deviceHieght = parseInt(deviceHieght);
var pausedIcon = require('../assets/images/pause_button.png');
var playedIcon = require('../assets/images/play_icon.png');

const MusicBoxExpanded = ({
  currentState,
  closeExpandedModel,
  isPlay,
  playSong,
  pauseSong,
  sliderTouchStart,
  sliderTouchEnd,
  sliderOnValueChange,
  sliderValue,
  maxSliderValue,
  getCurrentTimeString,
  getTotalTimeString,
  jump30SecondForward,
  jump30SecondBackward
}) => (
  <Animatable.View animation={'fadeInUpBig'} iterationCount={1}>
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        alignItems: 'center'
      }}
    >
      <View
        style={{ height: IS_IPHONE_X ? 35 : 25, backgroundColor: '#000' }}
      />
      <View
        style={{
          width: '90%',
          height: IS_IPHONE_X ? 20 : 15,
          backgroundColor: '#fff',
          flexDirection: 'column',
          alignItems: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20
        }}
      />

      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          flexDirection: 'column',
          bottom: 0,
          alignItems: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 5
        }}
      >
        <TouchableOpacity
          onPress={() => closeExpandedModel()}
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image
            resizeMode={'stretch'}
            source={require('../assets/images/arrow_down.png')}
            style={{
              width: 35,
              height: 25
            }}
          />
        </TouchableOpacity>

        <CardView
          cardElevation={12}
          cardMaxElevation={12}
          cornerRadius={5}
          style={{
            height: 250,
            width: 180,
            backgroundColor: 'white',
            marginTop: 20
          }}
        >
          <Image
            resizeMode={'stretch'}
            source={{
              uri: currentState.activeStory
                ? currentState.activeStory.small_image
                : ''
            }}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
          />
        </CardView>

        <Slider
          onTouchStart={sliderTouchStart}
          onTouchEnd={sliderTouchEnd}
          onValueChange={sliderOnValueChange}
          maximumValue={maxSliderValue}
          style={styles.container}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          value={sliderValue}
          minimumTrackTintColor="#8F8E94"
          thumbTouchSize={{ width: 50, height: 40 }}
          style={{ width: '80%' }}
        />

        <View style={{ width: '80%', flexDirection: 'row' }}>
          <View style={{ width: '50%', alignItems: 'flex-start' }}>
            <Text>{getCurrentTimeString()}</Text>
          </View>
          <View style={{ width: '50%', alignItems: 'flex-end' }}>
            <Text>{getTotalTimeString()}</Text>
          </View>
        </View>

        <View style={{ width: '80%', flexDirection: 'column' }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'Spectral-Bold',
                fontSize: 24,
                color: 'black'
              }}
            >
              {currentState.activeStory ? currentState.activeStory.title : ''}
            </Text>
          </View>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text>
              {currentState.activeStory
                ? currentState.activeStory.sub_title
                : ''}
            </Text>
          </View>
          {/*<View style={{ width: '100%', alignItems: 'center' }}>
          <Text>Biblioteca Ambrosiana</Text>
        </View>*/}
        </View>

        <View style={{ width: '80%', flexDirection: 'row', marginTop: 30 }}>
          <View style={{ width: '33%', alignItems: 'center', paddingTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                jump30SecondBackward();
              }}
            >
              <Image
                resizeMode={'contain'}
                source={require('../assets/images/back_30.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: '33%', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                isPlay ? pauseSong() : playSong();
              }}
            >
              <Image
                resizeMode={'contain'}
                source={isPlay ? pausedIcon : playedIcon}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: '33%', alignItems: 'center', paddingTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                jump30SecondForward();
              }}
            >
              <Image
                resizeMode={'contain'}
                source={require('../assets/images/forward_30.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '80%', flexDirection: 'row', marginTop: 30 }}>
          <View style={{ width: '20%', alignItems: 'center' }}>
            <Image
              resizeMode={'contain'}
              source={require('../assets/images/mute_icon.png')}
              style={{ width: 30, height: 30 }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              width: '60%',
              alignItems: 'center'
            }}
          >
            <VolumeSlider
              style={{ width: '100%' }}
              thumbSize={{
                width: 26,
                height: 26
              }}
              thumbTintColor="#DBDBDB"
              minimumTrackTintColor="#8F8E94"
              maximumTrackTintColor="#dddddd"
            />
            {/*<Slider
            minimumValue={-10}
            maximumValue={42}
            style={styles.container}
            trackStyle={styles.track2}
            thumbStyle={styles.thumb2}
            minimumTrackTintColor="#8F8E94"
            thumbTouchSize={{ width: 50, height: 40 }}
            style={{ width: '100%' }}
          />*/}
          </View>
          <View style={{ width: '20%', alignItems: 'center' }}>
            <Image
              resizeMode={'contain'}
              source={require('../assets/images/full_sound.png')}
              style={{ width: 30, height: 30 }}
            />
          </View>
        </View>
      </View>
    </View>
  </Animatable.View>
);
export default MusicBoxExpanded;
