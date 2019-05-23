import React from 'react';
import {styles} from './styles';
import {
    Text,
    View, Image, FlatList, TouchableOpacity,
    ImageBackground, ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const StoryScreen = ({currentState, closeStoryScreen}) => (

    <View style={{ width:'100%', flex:1 }}>
        <View style={{backgroundColor: "#FAFAFA", width: "100%", height: "100%"}}>
            <ScrollView>
                <ImageBackground source={require("../../assets/images/splash.png")}
                                 style={{width: "100%", height: 400, flexDirection: "column"}}>

                    <View style={{
                        width: "100%",
                        height: 50,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "flex-end"
                    }}>
                        <TouchableOpacity onPress={() => closeStoryScreen()}>
                            <Image resizeMode={"contain"} source={require("../../assets/images/close.png")}
                                   style={{width: 30, height: 30, marginEnd: 20}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        width: "100%",
                        height: 50,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        position: "absolute",
                        bottom: 20
                    }}>
                        <Text style={{fontSize: 30, color: "white", marginStart: 20, fontWeight: "bold"}}>
                            Racconti
                        </Text>
                    </View>

                </ImageBackground>

                <View style={{width: "100%", height: 90, flexDirection: "row"}}>

                    <LinearGradient
                        colors={['#BA54F5', '#00F2C3']}
                        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                        style={{height: "100%", width: "100%", flexDirection: "row"}}>

                        <View style={{width: "60%", height: "100%", flexDirection: "column"}}>
                            <Text style={{
                                fontSize: 18,
                                color: "white",
                                marginStart: 20,
                            }}>
                                Milano, 397 d.c
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                color: "white",
                                marginStart: 20,
                            }}>
                                Basilica di Sant’Ambrogio
                            </Text>
                        </View>
                        <View style={{
                            width: "40%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Image resizeMode={"contain"} source={require("../../assets/images/playbutton.png")}
                                   style={{width: 100, height: 60}}/>
                        </View>
                    </LinearGradient>
                </View>

                <View style={{width: "100%", backgroundColor: "#FAFAFA", flexDirection: "row"}}>
                    <Text style={{
                        fontSize: 22,
                        color: "black",
                        marginStart: 20,
                        marginEnd: 20,
                        marginTop: 40,
                        marginBottom: 40
                    }}>
                        Potrà sembrare assurdo ma a volte, ancora, dopo tanti anni, stento a crederci.
                        Stento a credere all'esistenza del pavimento di coccio che ora sto calpestando con composta
                        lentezza, stento a credere alla consistenza delle colonne - forti e strutturate - che sorreggono
                        le pareti della navata maggiore che ora sto percorrendo… quelle stesse, robuste colonne cui sono
                        solito appoggiarmi, di quando in quando, mentre mi aggiro - assorto nei miei pensieri - fra
                        queste mura sacre. Io, Aurelio Ambrogio, discendente della gens Aurelia, nato a Treviri nella
                        Gallia Transalpina, sono diventato il vescovo di Milano. E queste pareti, queste colonne, questi
                        capitelli costituiscono l'ossatura e le membra della mia basilica prediletta. Questo luogo
                        racconta la mia storia, è il punto d'arrivo della mia storia…
                    </Text>
                </View>

                <View style={{
                    width: "100%",
                    backgroundColor: "#FAFAFA",
                    flexDirection: "column",
                    marginTop: 15,
                    marginBottom: 15
                }}>
                    <Text style={{
                        fontSize: 22,
                        color: "grey",
                        marginStart: 20,

                    }}>
                        Storia
                    </Text>
                    <Text style={{
                        fontSize: 22,
                        color: "black",
                        marginStart: 20,
                        marginTop: 5
                    }}>
                        Elena Sgargiante
                    </Text>
                </View>

                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 0.5,
                    }}
                />
                <View style={{
                    width: "100%",
                    backgroundColor: "#FAFAFA",
                    flexDirection: "column",
                    marginTop: 15,
                    marginBottom: 15
                }}>
                    <Text style={{
                        fontSize: 22,
                        color: "grey",
                        marginStart: 20,
                    }}>
                        Illustrazione
                    </Text>
                    <Text style={{
                        fontSize: 22,
                        color: "black",
                        marginStart: 20,
                        marginTop: 5,
                    }}>
                        Marco Rossi
                    </Text>
                </View>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 0.5,
                    }}
                />
                <View style={{
                    width: "100%",
                    backgroundColor: "#FAFAFA",
                    flexDirection: "column",
                    marginTop: 15,
                    marginBottom: 15
                }}>
                    <Text style={{
                        fontSize: 22,
                        color: "grey",
                        marginStart: 20,
                    }}>
                        Doppiaggio
                    </Text>
                    <Text style={{
                        fontSize: 22,
                        color: "black",
                        marginStart: 20,
                        marginTop: 5,
                    }}>
                        Flavio Sempronio
                    </Text>
                </View>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 0.5,
                    }}
                />
                <View style={{
                    width: "100%",
                    backgroundColor: "#FAFAFA",
                    flexDirection: "column",
                    marginTop: 15,
                    marginBottom: 15
                }}>
                    <Text style={{
                        fontSize: 22,
                        color: "black",
                        marginStart: 20,
                    }}>
                        Il luogo
                    </Text>
                    <View style={{
                        width: "90%",
                        height: 200,
                        marginStart: 20,
                        marginEnd: 20,
                        marginTop: 10,
                        backgroundColor: "grey"
                    }}>
                    </View>
                    <Text style={{
                        fontSize: 22,
                        color: "black",
                        marginStart: 20,
                        marginEnd: 20,
                        marginTop: 10
                    }}>
                        Basilica di Sant’Ambrogio, Milano
                    </Text>
                </View>
            </ScrollView>

        </View>
    </View>

);
export default StoryScreen