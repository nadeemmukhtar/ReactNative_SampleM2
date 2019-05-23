import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const StoryScreenDetail = ({ currentState, otieniPressed, PlayPressed }) => (
  <View>
    {/*<ScrollView style={{marginBottom:100}}>*/}
    {console.log(
      currentState.downloadingStory
        ? currentState.downloadingStory.marker.latlng
        : ''
    )}
    <View style={{ width: '100%', height: 80, flexDirection: 'row' }}>
      <LinearGradient
        colors={['#BA54F5', '#00F2C3']}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={{ height: '100%', width: '100%', flexDirection: 'row' }}
      >
        <View
          style={{
            width: '60%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              marginStart: 20
            }}
          >
            {currentState.downloadingStory? currentState.downloadingStory.sub_title : ''}
          </Text>
         {/* <Text
            style={{
              fontSize: 16,
              color: 'white',
              marginStart: 20
            }}
          >
            Basilica di Sant’Ambrogio
          </Text>*/}
        </View>
        <View
          style={{
            width: '40%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity onPress={() => otieniPressed()}>
            {(currentState.downloadingStory
              ? currentState.downloadingStory.showDownloadBtn
              : true) && (
              <Image
                resizeMode={'contain'}
                source={require('../assets/images/otieni_button.png')}
                style={{ width: 100, height: 60 }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            {(currentState.downloadingStory
              ? currentState.downloadingStory.showLoading
              : false) && <AnimatedCircularProgress
                              size={50}
                              width={5}
                              fill={currentState.downloadingStory.fill}
                              tintColor="#ffffff"
                            />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              PlayPressed(currentState.downloadingStory);
            }}
          >
            {(currentState.downloadingStory
              ? !currentState.downloadingStory.showDownloadBtn &&
                currentState.downloadingStory.downloadedPath != ''
              : false) && (
              <Image
                resizeMode={'contain'}
                source={require('../assets/images/playbutton.png')}
                style={{ width: 100, height: 60 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>

    <View
      style={{
        width: '100%',
        backgroundColor: '#FAFAFA',
        flexDirection: 'row'
      }}
    >
      <Text
        style={{
          fontSize: 22,
          color: 'black',
          marginStart: 20,
          marginEnd: 20,
          marginTop: 40,
          marginBottom: 40
        }}
      >
        {currentState.downloadingStory
          ? currentState.downloadingStory.summary
          : ''}
      </Text>
    </View>

    <View
      style={{
        width: '100%',
        backgroundColor: '#FAFAFA',
        flexDirection: 'column',
        marginTop: 15,
        marginBottom: 15
      }}
    >
      <Text
        style={{
          fontSize: 22,
          color: 'grey',
          marginStart: 20
        }}
      >
        Storia
      </Text>
      <Text
        style={{
          fontSize: 22,
          color: 'black',
          marginStart: 20,
          marginTop: 5
        }}
      >
        {currentState.downloadingStory
          ? currentState.downloadingStory.content
          : ''}
      </Text>
    </View>

    <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 0.5
      }}
    />
    <View
      style={{
        width: '100%',
        backgroundColor: '#FAFAFA',
        flexDirection: 'column',
        marginTop: 15,
        marginBottom: 15
      }}
    >
      <Text
        style={{
          fontSize: 22,
          color: 'grey',
          marginStart: 20
        }}
      >
        Illustrazione
      </Text>
      <Text
        style={{
          fontSize: 22,
          color: 'black',
          marginStart: 20,
          marginTop: 5
        }}
      >
        {currentState.downloadingStory
          ? currentState.downloadingStory.illustrator.join(', ')
          : ''}
      </Text>
    </View>
    <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 0.5
      }}
    />
    <View
      style={{
        width: '100%',
        backgroundColor: '#FAFAFA',
        flexDirection: 'column',
        marginTop: 15,
        marginBottom: 15
      }}
    >
      <Text
        style={{
          fontSize: 22,
          color: 'grey',
          marginStart: 20
        }}
      >
        Doppiaggio
      </Text>
      <Text
        style={{
          fontSize: 22,
          color: 'black',
          marginStart: 20,
          marginTop: 5
        }}
      >
        {currentState.downloadingStory
          ? currentState.downloadingStory.dubber.join(', ')
          : ''}
      </Text>
    </View>
    <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 0.5
      }}
    />
    <View
      style={{
        width: '100%',
        backgroundColor: '#FAFAFA',
        flexDirection: 'column',
        marginTop: 15,
        marginBottom: 15
      }}
    >
      <Text
        style={{
          fontSize: 22,
          color: 'grey',
          marginStart: 20
        }}
      >
        Autore
      </Text>
      <Text
        style={{
          fontSize: 22,
          color: 'black',
          marginStart: 20,
          marginTop: 5
        }}
      >
        {currentState.downloadingStory
          ? currentState.downloadingStory.author.join(', ')
          : ''}
      </Text>
    </View>
    <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 0.5
      }}
    />
    <View
      style={{
        width: '100%',
        backgroundColor: '#FAFAFA',
        flexDirection: 'column',
        marginTop: 15,
        marginBottom: 15
      }}
    >
      <Text
        style={{
          fontSize: 22,
          color: 'black',
          marginStart: 20
        }}
      >
        Il luogo
      </Text>
      <View
        style={{
          width: '90%',
          height: 200,
          marginStart: 20,
          marginEnd: 20,
          marginTop: 10,
          zIndex: 10000
        }}
      >
        <MapView
          loadingEnabled={true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          moveOnMarkerPress={false}
          showsUserLocation={false}
          showsCompass={true}
          showsPointsOfInterest={false}
          followsUserLocation={false}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={false}
          scrollEnabled={false}
          maxZoomLevel={15}
          pitchEnabled={false}
          style={{ width: '100%', height: '100%' }}
          region={
            currentState.downloadingStory
              ? currentState.downloadingStory.region
              : {
                  latitude: 31.4859378,
                  longitude: 74.2971998,
                  latitudeDelta: 0.0,
                  longitudeDelta: 0.0
                }
          }
        >
          {currentState.downloadingStory && (
            <Marker coordinate={currentState.downloadingStory.marker.latlng} />
          )}
        </MapView>
      </View>
      <Text
        style={{
          fontSize: 22,
          color: 'black',
          marginStart: 20,
          marginEnd: 20,
          marginTop: 10
        }}
      >
        Basilica di Sant’Ambrogio, Milano
      </Text>
      <View style={{height:50}}></View>
    </View>
    {/*  </ScrollView>*/}
  </View>
);
export default StoryScreenDetail;
