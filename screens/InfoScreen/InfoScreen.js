import React from 'react';
import {styles} from './styles';
import {
    Text,
    View, Image, FlatList, TouchableOpacity,
    ImageBackground, ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {dimens, IS_IPHONE_X} from "../../config/styles";



const InfoScreen = ({currentState,openAboutScreen,closeScreen}) => (

    <View style={{width: "100%", height: "100%", backgroundColor: "white"}}>
        <ImageBackground source={require("../../assets/images/notificationback.png")} style={{width: "100%", height: "100%"}}>
            <View style={{ marginTop:25, width: "100%", height: "100%", alignItems: "center", flexDirection: "column"}}>


            <View style={{
                        marginTop: IS_IPHONE_X ? 15 : 5,
                        width: "100%",
                        height: 70,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "flex-end"
                    }}>
                        <TouchableOpacity onPress={() => closeScreen()}>
                            <Image resizeMode={"contain"} source={require("../../assets/images/close.png")}
                                   style={{width: 30, height: 30,  marginEnd: 20}}/>
                        </TouchableOpacity>
                    </View>
                <Text style={{
                    width: "80%",
                    fontSize: 36,
                    fontWeight: "bold",
                    marginTop: 60,
                    color: "black",
                    textAlign: "center"
                }}>{"Vuoi ricevere le ultime novità e le nuove storie  disponibili?"}</Text>
                <Text style={{
                    width: "80%",
                    fontSize: 18,
                    marginTop: 30,
                    color: "black",
                    textAlign: "center"
                }}>{"Possiamo avvisarti tramite una notifica push delle novità interessanti e quando nuove storie saranno disponibili."}</Text>
                <TouchableOpacity onPress={()=>openAboutScreen()} style={{width: "80%", height: 100, marginTop: 30}}>
                    <Image resizeMode={"contain"} source={require("../../assets/images/notification_button.png")}
                           style={{width: "100%", height: "100%"}}/>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    </View>

);
export default InfoScreen