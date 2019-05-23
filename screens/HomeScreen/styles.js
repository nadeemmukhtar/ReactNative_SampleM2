import {StyleSheet, Platform} from "react-native";
import {dimens, IS_IPHONE_X} from "../../config/styles";

const fieldHeight = 0.14634 * (dimens.screenWidth - 48);

export const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        flex: 1,
        paddingTop: IS_IPHONE_X ? 50 : Platform.OS === 'ios' ? 20 : 0,
      },
    tennisBall: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'greenyellow',
        borderRadius: 100,
        width: 100,
        height: 100,
    },
    button: {
        paddingTop: 24,
        paddingBottom: 24,
    },
    buttonText: {
        fontSize: 24,
        color: '#333',
    },
    container: {
        height: 30,
    },
    track: {
        height: 2,
        backgroundColor: '#303030',
    },
    thumb: {
        width: 10,
        height: 10,
        backgroundColor: '#31a4db',
        borderRadius: 10 / 2,
        shadowColor: '#31a4db',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
        shadowOpacity: 1,
    },

});