import DeviceInfo from 'react-native-device-info';
import {  Platform } from 'react-native'
const STORE_APP_ID = '284882215';
const BUNDLE_ID = Platform.OS == 'ios' ? STORE_APP_ID : DeviceInfo.getBundleId();  
export default {
    API_URL : 'https://parseapi.back4app.com/classes/Story',
    APPLICATION_ID : 'LpZ1qp2pXhAG6zU0J1jFuotKPzlFyUafQp3VZSo7',
    REST_API_KEY : '3QxrCLRhz4jejCM3ys9SP3llo2aviwcVnuuZdIoD',
    APP_STORE_URL: 'https://itunes.apple.com/pk/app/facebook/id',
    PLAY_STORE_URL: 'https://play.google.com/store/apps/details?id=',
    STORE_APP_ID,
    BUNDLE_ID,
     
}