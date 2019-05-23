import React from 'react';
import { styles } from './styles';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Linking
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-navigation';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const AboutScreen = ({
  currentState,
  openInfoScreen,
  closeScreen,
  shareApp,
  openUrl
}) => (
  <View style={styles.mainContainer}>
    <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
      <View
        style={{
          width: '100%',
          height: 70,
          backgroundColor: '#F9F9F9',
          flexDirection: 'row'
        }}
      >
        <View
          style={{ width: '25%', height: '100%', backgroundColor: '#F9F9F9' }}
        />
        <View
          style={{
            width: '50%',
            height: '100%',
            fontWeight: 'bold',
            backgroundColor: '#F9F9F9',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
            {'Informazioni'}
          </Text>
        </View>
        <View
          style={{
            width: '25%',
            height: '100%',
            backgroundColor: '#F9F9F9',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <TouchableOpacity onPress={() => closeScreen()}>
            <Text style={{ color: 'blue', fontSize: 18 }}>{'Chiudi'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 0.2
        }}
      />
      <ScrollView>
        <View style={{ width: '100%', backgroundColor: 'white' }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: 50
            }}
          >
            <Image
              resizeMode={'contain'}
              source={require('../../assets/images/heart_about.png')}
              style={{ width: 100, height: 100 }}
            />
            <Text
              style={{
                width: '80%',
                fontSize: 30,
                fontWeight: 'bold',
                marginTop: 10,
                color: 'black',
                textAlign: 'center'
              }}
            >
              {'Passaparola'}
            </Text>
            <Text
              style={{
                width: '80%',
                fontSize: 20,
                marginTop: 10,
                color: 'black',
                textAlign: 'center'
              }}
            >
              {
                'Se ti piace Utopos invita i tuoi amici a scaricare l’applicazione. Il tuo aiuto ci è indispensabile per crescere e pubblicare nuove storie.'
              }
            </Text>
            <TouchableOpacity
              onPress={() => shareApp()}
              style={{ width: '80%', height: 100, marginTop: 10 }}
            >
              <Image
                resizeMode={'contain'}
                source={require('../../assets/images/about_button.png')}
                style={{ width: '100%', height: '100%' }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 40,
            backgroundColor: '#F9F9F9',
            marginTop: 50,
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              width: '100%',
              fontSize: 19,
              marginStart: 20,
              color: 'grey',
              justifyContent: 'center'
            }}
          >
            {'A proposito di Utopos'}
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.2
          }}
        />
        <TouchableOpacity
          onPress={async () => {
            let url = 'https://www.google.com';
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
          }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              flexDirection: 'row'
            }}
          >
            <View style={{ width: '90%' }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 24,
                  marginTop: 5,
                  marginStart: 20,
                  color: 'black',
                  justifyContent: 'center'
                }}
              >
                {'Contattaci'}
              </Text>
              <Text
                style={{
                  width: '100%',
                  fontSize: 17,
                  marginTop: 5,
                  marginStart: 20,
                  marginBottom: 10,
                  color: 'black',
                  justifyContent: 'center'
                }}
              >
                {'A proposito di Utopos'}
              </Text>
            </View>
            <View
              style={{
                width: '10%',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                resizeMode={'contain'}
                source={require('../../assets/images/forward.png')}
                style={{ width: 20, height: 20 }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.2
          }}
        />
        <TouchableOpacity
          onPress={async () => {
            let url = 'https://www.google.com';
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
          }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              flexDirection: 'row'
            }}
          >
            <View style={{ width: '90%' }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 24,
                  marginTop: 5,
                  marginStart: 20,
                  color: 'black',
                  justifyContent: 'center'
                }}
              >
                {'Recensione'}
              </Text>
              <Text
                style={{
                  width: '100%',
                  fontSize: 17,
                  marginTop: 5,
                  marginStart: 20,
                  marginBottom: 10,
                  color: 'black',
                  justifyContent: 'center'
                }}
              >
                {'A proposito di Utopos'}
              </Text>
            </View>
            <View
              style={{
                width: '10%',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                resizeMode={'contain'}
                source={require('../../assets/images/forward.png')}
                style={{ width: 20, height: 20 }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.2
          }}
        />
        <TouchableOpacity
          onPress={async () => {
            let url = 'https://www.google.com';
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
          }}
        >
          <View
            style={{
              width: '100%',
              height: 40,
              backgroundColor: '#F9F9F9',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                width: '100%',
                fontSize: 19,
                marginStart: 20,
                color: 'grey',
                justifyContent: 'center'
              }}
            >
              {'Informazioni'}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.2
          }}
        />
        <TouchableOpacity
          onPress={async () => {
            let url = 'https://www.google.com';
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
          }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              flexDirection: 'row'
            }}
          >
            <View style={{ width: '90%' }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 24,
                  marginTop: 5,
                  marginStart: 20,
                  color: 'black',
                  justifyContent: 'center'
                }}
              >
                {'Privacy Policy'}
              </Text>
              <Text
                style={{
                  width: '100%',
                  fontSize: 17,
                  marginTop: 5,
                  marginStart: 20,
                  marginBottom: 10,
                  color: 'black',
                  justifyContent: 'center'
                }}
              >
                {'A proposito di Utopos'}
              </Text>
            </View>
            <View
              style={{
                width: '10%',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                resizeMode={'contain'}
                source={require('../../assets/images/forward.png')}
                style={{ width: 20, height: 20 }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.2
          }}
        />
        <TouchableOpacity
          onPress={async () => {
            let url = 'https://www.google.com';
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
          }}
        >
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            flexDirection: 'row'
          }}
        >
          <View style={{ width: '90%' }}>
            <Text
              style={{
                width: '100%',
                fontSize: 24,
                marginTop: 5,
                marginStart: 20,
                color: 'black',
                justifyContent: 'center'
              }}
            >
              {'Licenze'}
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 17,
                marginTop: 5,
                marginStart: 20,
                marginBottom: 10,
                color: 'black',
                justifyContent: 'center'
              }}
            >
              {'A proposito di Utopos'}
            </Text>
          </View>
          <View
            style={{
              width: '10%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              resizeMode={'contain'}
              source={require('../../assets/images/forward.png')}
              style={{ width: 20, height: 20 }}
            />
          </View>
        </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.2
          }}
        />
        <View
          style={{
            width: '80%',
            marginTop: 100,
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'white'
          }}
        >
          <Text
            style={{
              width: '100%',
              fontSize: 15,
              marginTop: 5,
              marginStart: 20,
              textAlign: 'center',
              color: 'black',
              justifyContent: 'center'
            }}
          >
            {'Versione applicazione 2.0.0'}
          </Text>
          <Text
            style={{
              width: '100%',
              fontSize: 15,
              textAlign: 'center',
              marginStart: 20,
              marginTop: 5,
              marginBottom: 25,
              color: 'black',
              justifyContent: 'center'
            }}
          >
            {'Copyright 2019 © Utopos. Tutti i diritti riservati.'}
          </Text>
        </View>
      </ScrollView>
    </View>
  </View>
);
export default AboutScreen;
