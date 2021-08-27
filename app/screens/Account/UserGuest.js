import React from "react";
import {StyleSheet, View, ScrollView, Image} from "react-native";
import {Button} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

export default function UserGuest(){
    const navigation = useNavigation();

    return(
        <ScrollView centerContent={true} style={styles.viewBody}>
            <Image source={require("../../../assets/logo.png")}
            resizeMode="contain"
            style={styles.image}/>
            <View style={styles.viewBtn}>
                <Button 
                    buttonStyle={styles.btnProfile}
                    containerStyle={styles.btnContainer}
                    title="Acceder a tu perfil"
                    onPress={() => navigation.navigate("login")}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewBody:{
        marginLeft: 10,
        marginRight: 10,
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 60,
        marginTop: 50,
    },
    title:{
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        textAlign: "justify",
        marginBottom: 20,
    },
    btnProfile: {
        backgroundColor: "#21ACFC",
        borderRadius: 10,
        height: 60,
    },
    btnContainer: {
        width: "100%",
    },
    viewBtn: {
        flex: 1,
        alignItems: "center",
    }
});