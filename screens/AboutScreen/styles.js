import { StyleSheet, Platform } from 'react-native';
import { dimens, IS_IPHONE_X } from '../../config/styles';

const fieldHeight = 0.14634 * (dimens.screenWidth - 48);

export const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
    marginTop: IS_IPHONE_X ? 25 : Platform.OS === 'ios' ? 20 : 0
  },
  innerContainer: {
    flex: 1,
    paddingStart: 24,
    paddingEnd: 24
  },
  fieldTitle: {
    color: '#333333',
    marginBottom: 8
  },
  field: {
    height: fieldHeight,
    borderColor: '#999999',
    borderRadius: 4,
    borderWidth: 1,
    paddingStart: 15,
    paddingEnd: 15,
    marginBottom: 17,
    justifyContent: 'center'
  },
  listTitle: {
    //fontFamily: 'Verdana',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '50%',
    marginLeft: 10,
    color: '#ffffff',
    opacity: 1
  },
  listDate: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 14
  },
  listTitlefilter: {
    //fontFamily: 'Verdana',
    fontSize: 25,
    marginTop: 10,
    marginLeft: 10,
    color: '#ffffff',
    opacity: 1
  },
  listCal: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 14
  },
  flatview2: {
    //justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    width: 220
  },
  button: {
    height: fieldHeight,
    width: '100%',
    borderRadius: 4,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    backgroundColor: '#ffffff'
  },
  leftheader: {},
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  rightheader: {
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  Homedesign1: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#37435D',
    opacity: 0.98,
    zIndex: 1
  },
  Homedesign2: {
    flexDirection: 'row',
    margin: 10,
    width: '100%'
  },
  Homedesign3: {
    flex: 1,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  Homedesign4: {
    fontFamily: 'RobotoSlab_Bold',
    fontSize: 20,
    color: 'white'
  },
  Homedesign5: {
    flex: 1,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  Homedesign6: {
    flexDirection: 'row',
    marginTop: 10,
    marginStart: 10,
    width: '50%',
    justifyContent: 'flex-start'
  },
  Homedesign7: { width: 50, height: 40, alignContent: 'stretch' },
  Homedesign8: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 0,
    color: '#000000'
  },
  Homedesign9: {
    flexDirection: 'row',
    marginTop: 10,
    marginEnd: 20,
    width: '50%',
    justifyContent: 'flex-end'
  },
  Homedesign10: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 0,
    color: 'red'
  },
  Homedesign11: {
    width: '95%',
    marginTop: 10,
    marginStart: 30,
    height: 280
  },
  Homedesign12: {
    flexDirection: 'column',
    width: '100%',
    marginEnd: 10,
    zIndex: 99,
    position: 'absolute'
  },
  Homedesign13: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    marginEnd: 15
  },
  Homedesign14: {
    fontSize: 17,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    marginStart: 5
  },
  Homedesign15: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    flexDirection: 'row',
    marginEnd: 10
  },
  Homedesign16: {
    fontSize: 18,
    justifyContent: 'flex-end',
    marginTop: 0,
    marginEnd: 10,
    color: 'orange'
  },
  Homedesign17: {
    fontSize: 36,
    fontFamily: 'RobotoSlab_Bold',
    color: 'white'
  },
  Homedesign18: {
    marginBottom: 20,
    marginStart: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  Homedesign19: {
    fontSize: 18,
    color: 'white',
    marginStart: 10,
    marginEnd: 20
  },
  Homedesign20: {
    fontSize: 18,
    color: 'white',
    marginStart: 10
  },
  Homedesign21: { width: '100%', height: '50%', flexDirection: 'column' },
  Homedesign22: {
    flexDirection: 'row',
    marginTop: 30,
    marginStart: 10,
    marginEnd: 10
  },
  Homedesign23: { width: 50, height: 40, alignContent: 'stretch' },
  Homedesign24: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 5,
    color: '#000000'
  },
  Homedesign25: { marginStart: 20, paddingBottom: 10, alignItems: 'flex-end' },
  Homedesign26: {
    flexDirection: 'column',
    width: '35%',
    height: '100%',
    paddingEnd: 30
  },
  Homedesign27: {
    flexDirection: 'row',
    marginTop: 10,
    marginStart: 0,
    marginEnd: 10,
    alignItems: 'center'
  },
  Homedesign28: { width: 40, height: 40, alignContent: 'stretch' },
  Homedesign29: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 0,
    color: '#000000'
  }
});
