import React from "react";
import {
    View, TouchableOpacity,TouchableWithoutFeedback,
    Text, Image, Dimensions, Animated, ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import CardView from "react-native-cardview";
import {styles} from "./styles";

let deviceHieght = Dimensions.get('window').height;
deviceHieght = parseInt(deviceHieght);

const MainList = ({item, currentState, mainItemClicked}) => (
    <TouchableWithoutFeedback onPress={() => mainItemClicked(item.id)}
                      style={{width: "100%", alignItems: "center", justifyContent: "center"}}>
        <Animatable.View animation={currentState.animationMainScreen} iterationCount={1}
                         style={{width: "100%", alignItems: "center", justifyContent: "center"}}>

            <Animated.View style={{width:currentState.cardViewWidth,marginTop:10,alignItems:"center"}}>
                <CardView
                    cardElevation={12}
                    cardMaxElevation={12}
                    cornerRadius={15}
                    style={{
                        flexWrap: 'nowrap',
                        height: 450,
                        width: "92%",
                        backgroundColor: "white",
                    }}>
                    <View style={{width:"100%",height:"100%",borderRadius:15}}>
                    <ImageBackground ref={(item)=>(currentState.allImages[item.id]=item)}
                        style={{width: "100%", height: "100%", flexDirection: "column"}}
                        source={item.image}>
                        <Text style={{
                            fontSize: 30,
                            color: "white",
                            marginStart: 20,
                            fontFamily:"Spectral-Bold",
                            marginTop: 20
                        }}>
                            {item.name}
                        </Text>
                        <Image resizeMode={"contain"} source={item.button}
                               style={{
                                   width: 100, height: 60, marginStart: 20,
                                   position: "absolute", right: 20, bottom: 10
                               }}/>
                    </ImageBackground>
                    </View>
                </CardView>
            </Animated.View>
        </Animatable.View>
    </TouchableWithoutFeedback>

);
export default MainList;
