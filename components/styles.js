import {StyleSheet} from "react-native";
import {dimens} from "../config/styles";

const fieldHeight = 0.14634 * (dimens.screenWidth - 48);

export const styles = StyleSheet.create({
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
    container3: {
        height: 0,
    },
    track: {
        height: 2,
        backgroundColor: '#DDDDDD',
    },
    track2: {
        height: 2,
        backgroundColor: '#DDDDDD',
    },
    thumb: {
        width: 10,
        height: 10,
        backgroundColor: '#8F8E94',
        borderRadius: 10 / 2,
        shadowColor: '#DDDDDD',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
        shadowOpacity: 1,
    },
    thumb2: {
        width: 26,
        height: 26,
        backgroundColor: '#DBDBDB',
        borderRadius: 26 / 2,
        shadowColor: '#DBDBDB',
        shadowOffset: {width: 27, height: 27},
        shadowRadius: 2,
        shadowOpacity: 0.7,
    },
    thumb3: {
        width: 6,
        height: 6,
        backgroundColor: '#3896FD',
        borderRadius: 6 / 2,
        shadowColor: '#3896FD',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
        shadowOpacity: 1,
    },
});