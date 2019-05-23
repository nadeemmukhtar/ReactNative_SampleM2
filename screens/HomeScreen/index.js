import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Easing,
  Alert,
  Linking,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import StoryScreenDetail from '../../components/StoryScreenDetail';
import MusicBox from '../../components/MusicBox';
import MusicBoxExpanded from '../../components/MusicBoxExpanded';
import { dimens, IS_IPHONE_X } from '../../config/styles';
import RNFetchBlob from 'rn-fetch-blob';
import Sound from 'react-native-sound';
import * as StoreReview from 'react-native-store-review';
import { getAppstoreAppVersion } from 'react-native-appstore-version-checker';
import DeviceInfo from 'react-native-device-info';
import Constants from '../../assets/constants/Constants';
import RNFirebase from 'react-native-firebase';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import GestureRecognizer, {
  swipeDirections
} from 'react-native-swipe-gestures';

let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Dimensions.get('window').height;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeImage: 'https://i.ibb.co/dGsrgxC/400x400-00ffff02.png',
      activeStory: undefined,
      downloadingStory: undefined,
      splashScreen: true,
      MainScreen: false,
      StoryScreen: false,
      stories: [],
      showOtieni: true,
      showLoading: false,
      showPlay: false,
      showDetail: false,
      modalVisible: false,
      modalVisible2: false,
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0,
      activeSoundPath: '',
      noOfSongPlayed: 0
    };
    this.sliderEditing = false;
    this.otieniPressed = this.otieniPressed.bind(this);
    this.PlayPressed = this.PlayPressed.bind(this);
    this.expandModel = this.expandModel.bind(this);
    this.closeExpandedModel = this.closeExpandedModel.bind(this);
    if (Platform.OS == 'ios') {
      Sound.setActive(true);
      Sound.setCategory('Playback', true);
    }
    const firebaseApp = RNFirebase.initializeApp({ debug: true });
    firebaseApp.analytics().logEvent('myEvent');
  }

  componentWillMount() {
    this.ShowAlertWithDelay();
    this.allImages = {};
    this.oldPosition = {};
    this.position = new Animated.ValueXY();
    this.dimensions = new Animated.ValueXY();
    this.animation = new Animated.Value(0);
    this.activeImageStyle = null;
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearInterval(this.timeout);
    }
    releasePlayer();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  onSwipeDown(gestureState) {
    //this.setState({myText: 'You swiped down!'});
    if (this.state.modalVisible2) {
      this.closeExpandedModel();
    }
  }

  releasePlayer = () => {
    if (this.sound) {
      this.sound.release();
      this.sound = null;
    }
  };

  pause = () => {
    if (this.sound) {
      this.sound.pause();
    }
    this.setState({ playState: 'paused' });
  };

  async checkPermission() {
    const enabled = await RNFirebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.props.navigation.push('InfoScreen');
      // this.requestPermission();
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
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  componentDidMount() {
    // this.checkPermission();
    this.createNotificationListeners();
    fetch(Constants.API_URL, {
      method: 'GET',
      headers: {
        'X-Parse-Application-Id': Constants.APPLICATION_ID,
        'X-Parse-REST-API-Key': Constants.REST_API_KEY
      }
    })
      .then(response => response.json())
      .then(data => {
        let stories = [];
        data.results.forEach(item => {
          const region = {
            latitude: item.position.latitude,
            longitude: item.position.longitude,
            latitudeDelta: 0.0682,
            longitudeDelta: 0.0121
          };
          const marker = {
            latlng: {
              latitude: item.position.latitude,
              longitude: item.position.longitude
            }
          };
          stories.push({
            ...item,
            showDownloadBtn: true,
            downloadedPath: '',
            showLoading: false,
            fill: 0,
            marker: marker,
            region: region
          });
        });
        this.setState({ stories: stories });
      })
      .catch(error => {
        console.log(error);
      });

    this.checkApplicationVersion();

    //console.log(DeviceInfo.getApplicationName() + " " + DeviceInfo.getVersion() + " " + DeviceInfo.getBundleId())
  }

  ShowAlertWithDelay = () => {
    setTimeout(() => {
      //this.setState({splashScreen: false});
      // Alert.alert("hello");
      this.closeScreen();
    }, 3000);
  };

  closeScreen() {
    this.setState({ splashScreen: false, MainScreen: true });
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = RNFirebase.notifications().onNotification(
      notification => {
        const { title, body } = notification;
        this.showAlert(title, body);
      }
    );

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = RNFirebase.notifications().onNotificationOpened(
      notificationOpen => {
        const { title, body } = notificationOpen.notification;
        console.log('OnOPen');
        this.showAlert(title, body);
      }
    );

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await RNFirebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log('OnINIT');
      this.showAlert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = RNFirebase.messaging().onMessage(message => {
      //process data message
      console.log(message);
    });
  }

  showAlert(title, body) {
    console.log(title, body + ' ' + 'call Notification');
    Alert.alert(
      title,
      body,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  }

  checkApplicationVersion = () => {
    //let bundleId  = Platform.OS == 'ios' ? Constants.APP_STORE_APP_ID : DeviceInfo.getBundleId();
    let currentVersion = DeviceInfo.getVersion();

    getAppstoreAppVersion(Constants.BUNDLE_ID) //put any apps packageId here
      .then(appVersion => {
        if (parseFloat(appVersion) > parseFloat(currentVersion)) {
          this.showUpdateAppPopUp(Constants.BUNDLE_ID);
        }
      })
      .catch(err => {
        console.log('error occurred', err);
      });
  };

  showUpdateAppPopUp = bundleId => {
    Alert.alert(
      'Update tip',
      'Finding new version, do you want to update?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Update',
          style: 'default',
          onPress: () => {
            let url = '';
            if (Platform.OS == 'ios') {
              url = Constants.APP_STORE_URL + bundleId;
            } else {
              url = Constants.PLAY_STORE_URL + bundleId;
            }

            Linking.canOpenURL(url)
              .then(supported => {
                if (!supported) {
                  console.log("Can't handle url: " + url);
                } else {
                  return Linking.openURL(url);
                }
              })
              .catch(err => console.error('An error occurred', err));
          }
        }
      ],
      { cancelable: false }
    );
  };

  openImage = index => {
    this.allImages[index].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX;
      this.oldPosition.y = pageY;
      this.oldPosition.width = width;
      this.oldPosition.height = height;

      this.position.setValue({
        x: pageX,
        y: pageY
      });

      this.dimensions.setValue({
        x: width,
        y: height
      });

      this.setState(
        {
          activeImage: this.state.stories[index].large_image,
          downloadingStory: this.state.stories[index]
        },
        () => {
          this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
            Animated.parallel([
              Animated.timing(this.position.x, {
                toValue: dPageX,
                duration: 500
              }),
              Animated.timing(this.position.y, {
                toValue: dPageY,
                duration: 500
              }),
              Animated.timing(this.dimensions.x, {
                toValue: dWidth,
                duration: 500
              }),
              Animated.timing(this.dimensions.y, {
                toValue: dHeight,
                duration: 500
              }),
              Animated.timing(this.animation, {
                toValue: 1,
                duration: 500
              })
            ]).start();
          });
        }
      );
    });
  };
  closeImage = () => {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 500
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        duration: 500
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: 500
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: 500
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 500
      })
    ]).start(() => {
      this.setState({
        activeImage: 'https://i.ibb.co/dGsrgxC/400x400-00ffff02.png'
        // activeStory: undefined
      });
      //modalVisible: false
      //
      //  this.pause();
      // this.releasePlayer();
    });
  };

  static navigationOptions = {
    header: null,
    title: 'Main Screen'
  };

  openInfoScreen() {
    this.props.navigation.push('AboutScreen');
  }

  otieniPressed() {
    if (this.state.downloadingStory) {
      let dirs = RNFetchBlob.fs.dirs.DocumentDir;
      //this.setState({ showOtieni: false });
      let downloadingStory1 = {
        ...this.state.downloadingStory,
        showLoading: true,
        showDownloadBtn: false
      };
      this.setState(
        { downloadingStory: downloadingStory1 },
        this.updateValuesInList
      );
      RNFetchBlob.config({
        fileCache: true,
        path: dirs + '/' + new Date().getTime() + '.mp3'
      })
        .fetch('GET', this.state.downloadingStory.audio)
        .progress({ count: 100 }, (received, total) => {
          //console.log('progress', received + ' ' + total);
          const fill = (received / total) * 100;
          let downloadingStory = {
            ...this.state.downloadingStory,
            fill: fill
          };
          this.setState(
            {
              downloadingStory: downloadingStory
            },
            this.updateValueOfFillInList(fill)
          );
        })
        .then(res => {
          let downloadingStory = {
            ...this.state.downloadingStory,
            downloadedPath: res.path(),
            showDownloadBtn: false,
            showLoading: false
          };
          this.setState(
            {
              downloadingStory: downloadingStory,
              showPlay: true
            },
            this.updateValuesInList
          );
        })
        .catch(err => {
          debugger;
          Alert.alert(' Alert', '' + err);
        });
    } else {
      Alert.alert('try Again');
    }
  }

  updateValueOfFillInList = fill => {
    let newStories = JSON.parse(JSON.stringify(this.state.stories));
    for (let i = 0; i < newStories.length; i++) {
      if (this.state.downloadingStory.objectId === newStories[i].objectId) {
        newStories[i].fill = fill;
        console.log(newStories[i]);
      }
    }
    this.setState({ stories: newStories });
  };

  PlayPressed(story) {
    this.setState({ modalVisible: true });
    if (this.state.playState === 'playing') {
      this.pause();
      this.releasePlayer();
    } else {
      if (this.sound) {
        if (this.state.playState === 'playing') {
          this.pause();
        }
        this.releasePlayer();
      }
    }
    console.log(story);
    if (story.objectId !== this.state.activeStory) {
      this.setState({ activeStory: story }, () => {
        this.playSong();
      });
    } else {
      this.playSong();
    }
  }

  expandModel() {
    // Alert.alert("expandModel");
    this.setState({ modalVisible: false, modalVisible2: true });
  }

  closeExpandedModel() {
    this.setState({ modalVisible2: false, modalVisible: true });
  }

  updateValuesInList = () => {
    let newStories = JSON.parse(JSON.stringify(this.state.stories));
    for (let i = 0; i < newStories.length; i++) {
      if (this.state.downloadingStory.objectId === newStories[i].objectId) {
        newStories[
          i
        ].downloadedPath = this.state.downloadingStory.downloadedPath;
        newStories[
          i
        ].showDownloadBtn = this.state.downloadingStory.showDownloadBtn;
        newStories[i].showLoading = this.state.downloadingStory.showLoading;
        console.log(newStories[i]);
      }
    }
    this.setState({ stories: newStories });
  };
  playSong = () => {
    if (this.state.noOfSongPlayed >= 3) {
      this.setState({ noOfSongPlayed: 0 });
      if (StoreReview.isAvailable) {
        StoreReview.requestReview();
      }
    } else {
      this.setState({ noOfSongPlayed: this.state.noOfSongPlayed + 1 });
    }

    if (this.state.activeStory && this.state.activeStory.downloadedPath != '') {
      if (this.sound) {
        this.sound.play(this.playComplete);

        this.setState({ playState: 'playing' });
      } else {
        const filepath = this.state.activeStory.downloadedPath;

        this.sound = new Sound(
          this.state.activeStory.downloadedPath,
          '',
          error => {
            if (error) {
              // Alert.alert('Notice', 'audio file error. (Error code : 1)');
              this.setState({ playState: 'paused' });
            } else {
              this.setState({
                playState: 'playing',
                duration: this.sound.getDuration()
              });
              this.sound.play(this.playComplete);
              // this.sound.setVolume(0.4)
            }
          }
        );
      }

      this.timeout = setInterval(() => {
        if (
          this.sound &&
          this.sound.isLoaded() &&
          this.state.playState == 'playing' &&
          !this.sliderEditing
        ) {
          this.sound.getCurrentTime((seconds, isPlaying) => {
            this.setState({ playSeconds: seconds });
          });
        }
      }, 100);
    } else {
      Alert.alert('Song not found', 'Please try again!');
    }
  };

  playComplete = success => {
    if (this.sound) {
      if (success) {
        this.checkPermission();
        // console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        Alert.alert('Notice', 'audio file error. (Error code : 2)');
      }
      this.setState({ playState: 'paused', playSeconds: 0 });
      this.sound.setCurrentTime(0);
    }
  };

  onSliderEditStart = () => {
    this.sliderEditing = true;
  };
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  };
  onSliderEditing = value => {
    if (this.sound) {
      this.sound.setCurrentTime(value);
      this.setState({ playSeconds: value });
    }
  };

  jumpPrev30Seconds = () => {
    this.jumpSeconds(-30);
  };

  jumpNext30Seconds = () => {
    this.jumpSeconds(30);
  };

  jumpSeconds = secsDelta => {
    if (this.sound) {
      this.sound.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if (nextSecs < 0) nextSecs = 0;
        else if (nextSecs > this.state.duration) nextSecs = this.state.duration;
        this.sound.setCurrentTime(nextSecs);
        this.setState({ playSeconds: nextSecs });
      });
    }
  };

  getAudioTimeString(seconds) {
    const h = parseInt(seconds / (60 * 60));
    const m = parseInt((seconds % (60 * 60)) / 60);
    const s = parseInt(seconds % 60);

    return (
      /*(h < 10 ? '0' + h : h) +
      ':' +*/
      (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
    );
  }

  getCurrentTimeText = () => {
    return this.getAudioTimeString(this.state.playSeconds);
  };

  getTotalTimeText = () => {
    return this.getAudioTimeString(this.state.duration);
  };

  render() {
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);
    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y
    };
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    const animatedContentY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0]
    });

    const animatedContentOpacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1]
    });

    const animatedContentStyle = {
      opacity: animatedContentOpacity,
      transform: [
        {
          translateY: animatedContentY
        }
      ]
    };

    const animatedCrossOpacity = {
      opacity: this.animation
    };

    return (
      <View style={styles.mainContainer}>
        {this.state.splashScreen && (
          <View style={{ width: '100%', height: '100%' }}>
            <ImageBackground
              source={require('../../assets/images/splash.png')}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        )}

        {this.state.MainScreen && (
          <View
            style={{
              marginBottom: this.state.modalVisible
                ? IS_IPHONE_X
                  ? 260
                  : 240
                : IS_IPHONE_X
                ? 160
                : 130
            }}
          >
            <View
              style={{
                width: '100%',
                height: 70,
                backgroundColor: '#F8F8F8',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
              }}
            >
              <TouchableOpacity onPress={() => this.openInfoScreen()}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/info.png')}
                  style={{
                    width: 30,
                    height: 30,
                    marginTop: IS_IPHONE_X ? 40 : 0,
                    marginEnd: 20
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{ width: '100%', height: 60, backgroundColor: '#F8F8F8' }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: 'black',
                  marginStart: 20,
                  paddingTop: IS_IPHONE_X ? 10 : 0,
                  fontWeight: 'bold'
                }}
              >
                Racconti
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 0.5
              }}
            />
            <ScrollView>
              {this.state.stories.map((story, index) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => this.openImage(index)}
                    key={story.objectId}
                  >
                    <Animated.View
                      style={{
                        height: SCREEN_HEIGHT - 220,
                        width: SCREEN_WIDTH,
                        padding: 15,
                        shadowColor: '#000',
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 0.4,
                        shadowRadius: 5
                      }}
                    >
                      <Image
                        ref={story => (this.allImages[index] = story)}
                        source={{ uri: story.large_image }}
                        style={{
                          flex: 1,
                          height: null,
                          width: null,
                          resizeMode: 'cover',
                          borderRadius: 20
                        }}
                      />
                      <View
                        style={{ position: 'absolute', bottom: 20, right: 30 }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.setState(
                              { downloadingStory: this.state.stories[index] },
                              this.otieniPressed
                            );
                          }}
                        >
                          {(this.state.stories[index]
                            ? this.state.stories[index].showDownloadBtn
                            : true) && (
                            <Image
                              resizeMode={'contain'}
                              source={require('../../assets/images/otieni_button.png')}
                              style={{ width: 100, height: 80 }}
                            />
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity>
                          {this.state.stories[index].showLoading && (
                            /*<ActivityIndicator
                              style={{ marginEnd: 15, marginBottom: 15 }}
                              size="large"
                              color="#000000"
                            />*/
                            <AnimatedCircularProgress
                              style={{ marginEnd: 15, marginBottom: 15 }}
                              size={50}
                              width={5}
                              fill={this.state.stories[index].fill}
                              tintColor="#ffffff"
                            />
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState(
                              { activeStory: this.state.stories[index] },
                              () => {
                                this.PlayPressed(this.state.activeStory);
                              }
                            );
                          }}
                        >
                          {(this.state.stories[index]
                            ? !this.state.stories[index].showDownloadBtn &&
                              this.state.stories[index].downloadedPath != ''
                            : false) && (
                            <Image
                              resizeMode={'contain'}
                              source={require('../../assets/images/playbutton.png')}
                              style={{ width: 100, height: 80 }}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      <View style={{ position: 'absolute', top: 20, left: 20 }}>
                        <Text
                          style={{
                            fontSize: 30,
                            color: 'white',
                            marginStart: 20,
                            fontFamily: 'Spectral-Bold',
                            marginTop: 20
                          }}
                        >
                          {story.title}
                        </Text>
                      </View>
                    </Animated.View>
                  </TouchableWithoutFeedback>
                );
              })}
            </ScrollView>

            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor:
                    this.state.activeImage !== '' &&
                    this.state.activeImage !==
                      'https://i.ibb.co/dGsrgxC/400x400-00ffff02.png'
                      ? 'white'
                      : 'transparent'
                }
              ]}
              pointerEvents={
                this.state.activeImage !== '' &&
                this.state.activeImage !==
                  'https://i.ibb.co/dGsrgxC/400x400-00ffff02.png'
                  ? 'auto'
                  : 'none'
              }
            >
              <ScrollView horizontal={false}>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column'
                  }}
                >
                  <View
                    style={{ flex: 1, zIndex: 1001, height: 500 }}
                    ref={view => (this.viewImage = view)}
                  >
                    <Animated.Image
                      source={{
                        uri:
                          this.state.activeImage !== ''
                            ? this.state.activeImage
                            : ''
                      }}
                      style={[
                        {
                          resizeMode: 'cover',
                          top: 0,
                          left: 0,
                          height: null,
                          width: null
                        },
                        activeImageStyle
                      ]}
                    />
                    <TouchableWithoutFeedback onPress={() => this.closeImage()}>
                      <Animated.View
                        style={[
                          {
                            position: 'absolute',
                            top: IS_IPHONE_X ? 40 : 30,
                            right: 20
                          },
                          animatedCrossOpacity
                        ]}
                      >
                        <Image
                          resizeMode={'contain'}
                          source={require('../../assets/images/close.png')}
                          style={{
                            width: 30,
                            height: 30,
                            shadowColor: '#000',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.4,
                            shadowRadius: 10
                          }}
                        />
                      </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.closeImage()}>
                      <Animated.View
                        style={[
                          {
                            position: 'absolute',
                            bottom: 20,
                            left: 20
                          },
                          animatedCrossOpacity
                        ]}
                      >
                        <Text
                          style={{
                            fontSize: 30,
                            color: 'white',
                            marginStart: 20,
                            fontFamily: 'Spectral-Bold'
                          }}
                        >
                          {this.state.downloadingStory
                            ? this.state.downloadingStory.title
                            : ''}
                        </Text>
                      </Animated.View>
                    </TouchableWithoutFeedback>
                  </View>
                  <Animated.View
                    style={[
                      {
                        flex: 1,
                        zIndex: 1000,
                        backgroundColor: 'white'
                      },
                      animatedContentStyle
                    ]}
                  >
                    <StoryScreenDetail
                      currentState={this.state}
                      PlayPressed={this.PlayPressed}
                      otieniPressed={this.otieniPressed}
                    />
                  </Animated.View>
                </View>
              </ScrollView>
            </View>
          </View>
        )}

        {this.state.modalVisible && (
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              height: IS_IPHONE_X ? 130 : 112,
              position: 'absolute',
              bottom: 0,
              zIndex: 3,
              opacity: 1,
              backgroundColor: 'transparent'
            }}
          >
            <MusicBox
              currentState={this.state}
              expandModel={this.expandModel}
              isPlay={this.state.playState === 'playing'}
              playSong={this.playSong}
              pauseSong={this.pause}
              sliderTouchStart={this.onSliderEditStart}
              sliderTouchEnd={this.onSliderEditEnd}
              sliderOnValueChange={this.onSliderEditing}
              sliderValue={this.state.playSeconds}
              maxSliderValue={this.state.duration}
            />
          </View>
        )}

        {this.state.modalVisible2 && (
          <GestureRecognizer
            onSwipeDown={state => this.onSwipeDown(state)}
            config={config}
            style={{
              flexDirection: 'column',
              height: SCREEN_HEIGHT,
              height: '100%',
              width: '100%',
              position: 'absolute',
              bottom: 0,
              zIndex: 3,
              opacity: 1,
              backgroundColor: 'transparent'
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                width: '100%',
                height: SCREEN_HEIGHT,
                position: 'absolute',
                bottom: 0,
                zIndex: 3,
                opacity: 1,
                backgroundColor: 'transparent'
              }}
            >
              <MusicBoxExpanded
                currentState={this.state}
                closeExpandedModel={this.closeExpandedModel}
                isPlay={this.state.playState === 'playing'}
                playSong={this.playSong}
                pauseSong={this.pause}
                sliderTouchStart={this.onSliderEditStart}
                sliderTouchEnd={this.onSliderEditEnd}
                sliderOnValueChange={this.onSliderEditing}
                sliderValue={this.state.playSeconds}
                maxSliderValue={this.state.duration}
                getCurrentTimeString={this.getCurrentTimeText}
                getTotalTimeString={this.getTotalTimeText}
                jump30SecondForward={this.jumpNext30Seconds}
                jump30SecondBackward={this.jumpPrev30Seconds}
              />
            </View>
          </GestureRecognizer>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    width: '100%',
    flex: 1
    //marginTop: IS_IPHONE_X ? 25 : Platform.OS === 'ios' ? 20 : 0,
  }
});
